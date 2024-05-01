import React from "react";
import "./SubCard.css";
import { ForecastList } from "../../utils/type";

interface SubCardProps {
  forecastObj: ForecastList;
}

const SubCard: React.FC<SubCardProps> = ({ forecastObj }) => {
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
          <h2>{forecastObj.date}</h2>
          <p className="temperature">{forecastObj.temp}°C</p>
          <p>{forecastObj.weather}</p>
          <p>Humidity: {forecastObj.humidity}%</p>
          <p>Wind Speed: {forecastObj.wind} km/h</p>
        </div>
      </div>
    </div>
  );
};

export default SubCard;
