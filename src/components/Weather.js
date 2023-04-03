import React from "react";

const Weather = (props) => {

    return (
        <div className="infoWeather">
            {props.city &&
                <div>
                    <p>Местоположение: {props.city}, {props.country}</p>
                    <p>Температура: {props.temp} &#8451;</p>
                    <p>Давление: {props.pressure}</p>
                    <p>Заход солнца: {props.sunset}</p>
                </div>
            }  
            <p className="error">{props.error}</p>
        </div>
    );
}

export default Weather;