import axios from 'axios';
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'

const getAll = () => {
const request = axios.get(`${baseUrl}api/all`)
return request.then(response => response.data)
};
const getByName = (name) => {
  const request = axios.get(`${baseUrl}api/name/${name}`)
  return request.then(response => response.data)
};
const getWeather = (country) => {
  const request = axios.get(`http://api.weatherstack.com/current?access_key=&query=${country}`)
  return request.then(response => response.data)
}
const countriesServices = {
  getAll, getByName, getWeather
};

export default countriesServices