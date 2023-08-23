import countriesServices from "./services/countries";
import { useState, useEffect } from "react";
import Countries from "./components/countries";
function App() {
  const [name, setName] = useState('');
  const [country, setCountry] = useState([]);

  const filterCountry = (e) => {
    setName(e.target.value);
  };
  useEffect(() => {
    if (name){
      countriesServices
      .getAll()
      .then((allCountry) => setCountry(
        allCountry.filter((filterCount) => filterCount.name.common.toLowerCase().includes(name.toLowerCase()))
      ))
      .catch((err) => console.log(err));
    }
  }, [name]);

  return(
    <Countries country={country} setCountry={setCountry} name={name} setName={setName} filterCountry={filterCountry}/>
  )
}

export default App;
