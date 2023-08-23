const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI
console.log(url);

mongoose.connect(url).then(()=> console.log('connect success')).catch((e)=> console.log("error : ",e))

const personSchema = new mongoose.Schema({
  name: {
    type : String,
    minlength : 3,
    required : true
  },
  number: {
    type : String,
    minlength : 8,
    validate :{
      validator: function (value) {
        // Check if the phone number matches the desired format
        const regex = /^\d{2,3}-\d+$/;
        return regex.test(value);
      },
      message: 'Invalid phone number format',
    },
    required: [true, 'Phone number is required'],
  },
})
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Persone', personSchema)

