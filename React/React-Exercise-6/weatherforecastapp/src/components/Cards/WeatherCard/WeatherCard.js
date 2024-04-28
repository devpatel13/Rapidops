import React, { useEffect } from "react";
import "./WeatherCard.css";

export default function WeatherCard({ forecastObj }) {
  useEffect(() => {
    console.log(forecastObj);
  }, []);

  return (
    <>
      <div className="weather-card-container">
        <div className="weather-card">
          <div className="weather-icon">
            <img
              src={`https://openweathermap.org/img/wn/${forecastObj.weatherIcon}@2x.png`}
              alt="Weather Icon"
            />
          </div>
          <div className="weather-details">
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
    </>
  );
}
