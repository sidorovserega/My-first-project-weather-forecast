import React, { useState } from "react";
import Form from "./components/Form";
import Info from "./components/Info";
import Weather from "./components/Weather";
import './App.css';

const API_KEY = "8f1e995a6e218b68b6f7cae1d46791ff";

const App = () => {
  
  const [state, setState] = useState({
    temp: undefined,  
    city: undefined,
    country: undefined,
    pressure: undefined,
    sunset: undefined,
    error: undefined
  });
  
  const getttingWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    
    if (city) {
      const api_url = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
      const data  = await api_url.json();
     
      //перевод милисекунд в нужный формат времени
      let sunset = data.sys.sunset;
      let date = new Date(sunset * 1000);
      let sunset_date = date.toLocaleTimeString();
      //----------------------------------------------------
      let temperature = Math.round(data.main.temp - 273.15);
      
      setState({
        temp: temperature,  
        city: data.name,
        country: data.sys.country,
        pressure: data.main.pressure,
        sunset: sunset_date,
        error: undefined
      });
    } 
    if (!city) {
      setState({
        temp: undefined,  
        city: undefined,
        country: undefined,
        pressure: undefined,
        sunset: undefined,
        error: "Введите название города"
        })
    } 
  }

  return (
    <div className="wrapper">
      <div className="main">
        <div className="info">
          <Info />
        </div>
        <div className="form">
          <Form weatherMethod={getttingWeather} />
          <Weather 
            temp={state.temp}
            city={state.city}
            country={state.country}
            pressure={state.pressure}
            sunset={state.sunset}
            error={state.error}
          />
        </div>
      </div>
    </div>
  )
}

export default App;