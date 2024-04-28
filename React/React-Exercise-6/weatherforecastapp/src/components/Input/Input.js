import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Input({ setCityName }) {
  const [city, setCity] = useState("");
  const navigate = useNavigate();
  const verifyInput = () => {
    console.log(city.trim());
    if (!city.trim() || !isNaN(city.trim()))
      throw new Error("City name cannot be empty or a number");
    else navigate(`forecast/${city}`);
  };
  return (
    <div className="container">
      <div className="centered-input">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={verifyInput}>Go!</button>
      </div>
    </div>
  );
}
