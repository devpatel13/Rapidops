import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Input: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const navigate = useNavigate();
  const verifyInput = () => {
    const regex = /\d/;
    console.log(city.trim());
    if (!city.trim() || regex.test(city.trim()))
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
};

export default Input;
