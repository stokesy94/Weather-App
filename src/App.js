import React, {useState} from 'react';
import Weather from "./Weather.js";
import Form from "./Form.js";
import {api} from "./apiKeys";
import "./app.css";

function App() {

  const [weather, setWeather] = useState([])
 
  async function fetchData(e) {
 
    const city = e.target.elements.city.value
    const country = e.target.elements.country.value
    e.preventDefault()

    const myData = await fetch(`https://community-open-weather-map.p.rapidapi.com/forecast?q=${city},${country}&units=metric`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
        "x-rapidapi-key": `${api}`,
        
      }
    })
      .then(response => response.json())
      .then(data => data)
    if (city && country) {
      setWeather({
          data: myData,
          city: myData.city.name,
          country: myData.city.country,
          description: myData.list[0].weather[0].description,
          humidity: myData.list[0].main.humidity,
          temperature: myData.list[0].main.temp,
          wind: myData.list[0].wind.speed,
          error: ""
            
      })
    } else {
      setWeather({
      data: "",
      city: "",
      country: "",
      description: "",
      humidity: "",
      temperature: "",
      wind: "",
      error: "Please type a city and country"
    })
  }
  console.log(weather.data);
  }

  
  return ( 
    
    <div className="app">
      <h3>Weather App</h3>
      <Form getWeather={fetchData}/>
      <Weather
       city={weather.city}
       country={weather.country}
       description={weather.description}
       temperature={weather.temperature}
       error={weather.error} />
    </div>
  );
   

  }

export default App;
