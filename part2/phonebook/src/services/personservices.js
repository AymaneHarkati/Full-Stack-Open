import axios from 'axios';
const baseUrl = '/api'

const getAll = () => {
const request = axios.get(`${baseUrl}/persones`)
return request.then(response =>   response.data)
};
const addPerson = (newPerson) => {
  const request = axios.post(`${baseUrl}/persones`, newPerson)
  return request.then(response => response.data)
};
const updatePerson = (id, newObject) => {
  const request = axios.put(`${baseUrl}/persones/${id}`, newObject)
  return request.then(response => response.data)
};
const deletePerson =  (id) => {
  console.log('deleting...')
  const request = axios.delete(`${baseUrl}/persones/${id}`)
  return request.then(response => response.data)
};

 export default {getAll, addPerson, updatePerson, deletePerson}