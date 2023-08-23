const SingleCountry = (props) => {   
const languageArray = Object.entries(props.country[0].languages);
return (
    <div className="App">
      find Countries :
      <input value={props.name} type="text" onChange={props.filterCountry} autoFocus/>
      <br />
      <h1>{props.country[0].name.common}</h1>
      <p>capital : {props.country[0].capital}</p>
      <p>area : {props.country[0].area}</p>
      <h4>Languages :</h4>
      {languageArray.map((e) => (
        <li key={e[0]}>{e[1]}</li>
      ))}
      <img src={props.country[0].flags.svg} alt="Country Flag" width="400px" /><br/>
      <div>
              <h4>temperature</h4>
              <div>
                {props.temperature} Celcius
              </div>
              <img src={props.weatherIcon} alt="Weather Icon" width="5%" />
            </div>
            <div>
              <h4>wind</h4>
              <div>Speed: {props.windSpeed} mph</div>
              <div>Direction: {props.windDirection}</div>
            </div>
    </div>

)
}
export default SingleCountry;