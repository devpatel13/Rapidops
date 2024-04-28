import React from "react";
import "./SubCard.css";

const SubCard = ({ forecastObj }) => {
  return (
    <div className="sub-card-container">
      <div className="sub-card">
        <div className="weather-icon">
          <img
            src={`https://openweathermap.org/img/wn/${forecastObj.weatherIcon}@2x.png`}
            alt="Weather Icon"
          />
        </div>
        <div className="weather-details">
          <h2>
            {forecastObj.date}
            {/* {forecastObj.cityName}, {forecastObj.stateName} */}
          </h2>
          <p className="temperature">{forecastObj.temp}°C</p>
          {/* <p>Max Temp: {forecastObj.maxTemp}°C</p>
            <p>Min Temp: {forecastObj.minTemp}°C</p> */}
          <p>{forecastObj.weather}</p>
          <p>Humidity: {forecastObj.humidity}%</p>
          <p>Wind Speed: {forecastObj.wind} km/h</p>
        </div>
      </div>
    </div>

    // <div className="sub-card">
    //   {forecastObj ? <WeatherCard forecastObj={forecastObj} /> : null}
    // </div>
  );
};

export default SubCard;
