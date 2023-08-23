import { useState, useEffect } from 'react'
import Persons from './components/persons';
import Filter from './components/filter';
import PersonsForm from './components/personsform';
import personservices from './services/personservices';
import React  from 'react';
import Notification from './components/notif'
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [wordFilter, setWorldFilter] = useState('')
  const [errormsg, setErrorMsg] = useState(null)
  const [styleMsg, setStyleMsg] = useState('valid')


  const inputName = (event)=>{
    setNewName(event.target.value)
  }
  const inputNum = (event)=>{
    setNewNum(event.target.value)
  }
  const inputFilter = (event)=>{
    setWorldFilter( event.target.value)
  }
  const addName = (event)=>{
      event.preventDefault();
      const personExists = persons.filter(person=> person.name.toLowerCase() === newName.toLowerCase());
      const newPerson = { name : newName, number : newNum, id: persons.length +1};
    if(personExists.length === 1){
        const msg = `${newName} is already added to phonebook, replace the old number with the new one`
       if(window.confirm(msg)){
        personservices.updatePerson(personExists[0].id, newPerson)
        .then(newData => {
          persons[newData.id-1] = newData
          setPersons(persons.map(person => person))
          setErrorMsg('Updated Person Number')
          setStyleMsg('valid')
          setTimeout(() => setErrorMsg(null),2000)
        })
        .catch(err=> {
          console.log(err)
          setErrorMsg('The Person is already removed to phonebook')
          setStyleMsg('error')
          setTimeout(() => setErrorMsg(null),2000)
        })
       }
    } 
    else{
      personservices.addPerson(newPerson).then( ()=> {
        setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNum('')
      setErrorMsg('Added Person Number')
      setStyleMsg('valid')
      setTimeout(() => setErrorMsg(null),2000)
      }).catch(err => console.error(err));
    }
 
    
  }

  const populate = () => {
    personservices.getAll().then(persons => setPersons(persons))
  }
  useEffect(populate,[])
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errormsg} style={styleMsg}/>
      <Filter wordFilter={wordFilter} inputFilter={inputFilter}/>
      <h2>Add a new</h2>

      <PersonsForm addName={addName} newName={newName} inputName={inputName} newNum={newNum} inputNum={inputNum} />
      <Persons persons={persons} wordFilter={wordFilter} setPersons={setPersons}/>
    </div>
  )
}

export default App