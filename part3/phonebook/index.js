const express = require('express');
const morgan = require('morgan');
require('dotenv').config()

const app = express();
app.use(express.json())
app.use(express.static('build'))
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}))



const Persons = require('./models/persons')

app.get('/api/persones', (req, res) => {
  Persons.find({}).then(persons => res.json(persons));
})

app.put('/api/persones/:id', (req, res, next) => {
  const body = req.body
  const person = {
    name: body.name,
    number: body.number,
  }
  Persons.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(result => {
      res.json(result)
    })
    .catch(error => next(error))
})

app.get('/api/persones/:id', (req, res, next) => {
  const id = Number(req.params.id);
  Persons.findById(id).then(persons =>{
    if(persons){
      res.json(persons);
    }else{
      res.status(500).end();
    }
  }).catch(err => next(err));
})

app.delete('/api/persones/:id', (req, res) => { 
  const id = req.params.id;
  console.log(req.params.id)
  Persons.findByIdAndRemove(id).then(() =>   res.status(204).end()).catch(e=> console.log(e))
})

app.post('/api/persones', (req, res, next) => {
  const body = req.body;
  let person = Persons.find({}).then(persons => {
    return persons.filter((person)=>  person.name === body.name && person.number === body.number)
  });

  person = new Persons({
      name : body.name || 'not defined',
      number : body.number || 'not defined',
    })
    person.save().then(results => res.json(results)).catch(err => next(err));
})

// middleware
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidatorError'){
    return response.status(400).send({ error: 'Validation error' })

  }

  next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

app.use(unknownEndpoint)
const PORT = process.env.PORT ;
app.listen(PORT, () => console.log('listening on port 3001'));