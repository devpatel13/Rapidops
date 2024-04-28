import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import fetchData from "../../api/ForecastAPI";
import MainCard from "../Cards/MainCard/MainCard";
import SubCard from "../Cards/SubCard/SubCard";
import "./Forecast.css";

export default function Forecast({ handleError }) {
  const params = useParams();
  const navigate = useNavigate();
  const [forecastList, setForecastList] = useState([]);
  useEffect(() => {
    try {
      const getData = async () => {
        const tempForecastList = await fetchData(params.city);
        console.log(tempForecastList);
        if (tempForecastList.status === 200) setForecastList(tempForecastList);
        else {
          console.error(tempForecastList.message);
          handleError({
            status: tempForecastList.status,
            message: tempForecastList.message,
          });
          // throw new Error("Error fetching data from the api");
          navigate("/error", { replace: true });
        }
      };
      getData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="forecast-display">
      {forecastList.length > 0 ? (
        <MainCard forecastObj={forecastList[0]} />
      ) : null}
      {forecastList.length > 5 ? (
        <div className="sub-cards">
          {forecastList.slice(1).map((forecastObj, index) => (
            <SubCard key={index} forecastObj={forecastObj} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
