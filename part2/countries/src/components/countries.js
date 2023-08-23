import React from "react";
import { useState } from "react";
import Button from "./button";
import SingleCountry from "./singlecountrie";
import countriesServices from "../services/countries";
import { useEffect } from "react";
const Countries = (props) => {
  const { country, setCountry, name, filterCountry } = props;
  const [show, setShow] = useState(false);
  const [weatherIcon, setWeatherIcon] = useState('')
  const [temperature, setTemperature] = useState('')
  const [windSpeed, setWindSpeed] = useState('')
  const [windDirection, setWindDirection] = useState('')
  

  const handleClick = (compName) => {
    const selected = country.filter(count => count.name.common === compName)
    setCountry(selected)
    setShow(!show);
  };

  useEffect(()=>{
      if(country.length === 1){
        countriesServices.getWeather(country[0].name.common).then(data => {
          setWeatherIcon(data['current']['weather_icons'][0])
          setTemperature(data['current']['temperature'])
          setWindSpeed(data['current']['wind_speed'])
          setWindDirection(data['current']['wind_dir'])
        }).catch(err=> console.log(err))
      }
  },[country])


    if (country.length === 0) {
      return (
        <div className="App">
          find Countries :
          <input value={name} type="text" onChange={filterCountry} autoFocus/>
          <br />
          <p>No countries found</p>
        </div>
      );
    } else if (country.length === 1) {
      return <SingleCountry country={country} name={name} filterCountry={filterCountry} weatherIcon={weatherIcon} temperature={temperature}
    windSpeed={windSpeed} windDirection={windDirection} />
    } else {
      if (country.length <= 10) {
        return (
          <div className="App">
            find Countries :
            <input value={name} type="text" onChange={filterCountry} autoFocus/>
            <br />
            {country.map((singleCount) => {
              return (
                <ul key={singleCount.name.common}>
                  <li>
                    {singleCount.name.common} <Button handleClick={() => handleClick(singleCount.name.common)} name="show"/>
                  </li>
                </ul>
              );
            })}
          </div>
        );
      }
      return (
        <div className="App">
          find Countries :
          <input value={name} type="text" onChange={filterCountry} autoFocus/>
          <br />
          <p>too many countries</p>
        </div>
      );
    }
  }


export default Countries;
