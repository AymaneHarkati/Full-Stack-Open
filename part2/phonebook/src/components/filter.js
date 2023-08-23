import React from 'react';

const Filter = ({wordFilter, inputFilter})=>{
  return(<div>
    filter shown by :<input value={wordFilter} onChange={inputFilter}/>
  </div>)
}

  
export default Filter;