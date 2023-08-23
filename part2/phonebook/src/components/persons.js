import React from 'react';
import personServices from '../services/personservices';

const Persons = (props) =>{
  const {persons, setPersons} = props;
  const deletePerson = (id) =>{
    personServices.deletePerson(id).then(() => setPersons(persons.filter(person=> person.id !== id))).catch(err=>console.log(err));
  }
    return(
    <>
    <h2>Numbers</h2>
    {persons.filter(person => person.name.toLocaleLowerCase().includes(props.wordFilter.toLocaleLowerCase()))
    .map(person => {
      return(
        <>
          <span key={person.id}>{person.name} {person.number}
          <button type='sumbit' onClick={() => window.confirm(`Delete ${person.name}`) ? deletePerson(person.id) : console.log('canceled')}>Delete</button>
          </span><br />
         
        </>
      )
    })}
    </>
  )
}
export default Persons;