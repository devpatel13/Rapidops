import React from "react";
import "./MainCard.css";

const MainCard = ({ forecastObj }) => {
  console.log("in");
  return (
    <div className="main-card-container">
      <div className="main-card">
        <div className="main-icon">
          <img
            src={`https://openweathermap.org/img/wn/${forecastObj.weatherIcon}@2x.png`}
            alt="Weather Icon"
          />
        </div>
        <div className="main-details">
          <h2>
            {forecastObj.cityName}, {forecastObj.stateName}
          </h2>
          <p className="temperature">{forecastObj.temp}°C</p>
          <p>Feels like: {forecastObj.feelsLike}°C</p>
          <p>Max Temp: {forecastObj.maxTemp}°C</p>
          <p>Min Temp: {forecastObj.minTemp}°C</p>
          <p>{forecastObj.weather}</p>
          <p>Humidity: {forecastObj.humidity}%</p>
          <p>Wind Speed: {forecastObj.wind} km/h</p>
        </div>
      </div>
    </div>
  );
};

export default MainCard;
