import React  from 'react';

const PersonsForm = ({addName, newName, inputName, newNum, inputNum}) => {
  return(
    <>
     <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={inputName}/><br />
          number: <input value={newNum} onChange={inputNum}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  )
}
export default PersonsForm;