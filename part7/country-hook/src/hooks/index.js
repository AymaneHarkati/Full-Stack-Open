import {useState} from 'react';


export const useSearch = (type) => {
  const [value , setValue] = useState('');

  const onChange = (e)=> {
    setValue(e.target.value);
  }

  return {
    type,
    value,
    onChange
  }
}