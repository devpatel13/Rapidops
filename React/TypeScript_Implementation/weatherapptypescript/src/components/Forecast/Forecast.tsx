import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import fetchData from "../../api/forecastAPI";
import MainCard from "../Cards/MainCard/MainCard";
import SubCard from "../Cards/SubCard/SubCard";
import "./Forecast.css";
import { ErrorState, ForecastList } from "../utils/type";

interface ForecastProps {
  handleError: (errorObj: ErrorState) => void;
}

const Forecast: React.FC<ForecastProps> = ({ handleError }) => {
  const params = useParams();
  const navigate = useNavigate();
  // here
  const [forecastList, setForecastList] = useState<ForecastList[] | []>([]);
  useEffect(() => {
    try {
      const getData = async (): Promise<void> => {
        // here in params.city
        const response = await fetchData(params.city);
        console.log(response);
        if (response.tempForecastList) {
          if (response.status === 200)
            setForecastList(response.tempForecastList);
          else {
            console.error(response.message);
            handleError({
              status: response.status,
              message: response.message,
            });
            // throw new Error("Error fetching data from the api");
            navigate("/error", { replace: true });
          }
        } else {
          console.error("Error fetching forecast list from API");
          handleError({
            status: response.status,
            message: "Error fetching forecast list from API",
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
};

export default Forecast;
