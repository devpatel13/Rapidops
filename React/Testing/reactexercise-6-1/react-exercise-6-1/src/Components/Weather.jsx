import React from "react";

export default function Weather(props) {
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  return (
    <>
      {props.date ===
      new Date(Date.now()).toLocaleDateString("en-US", options) ? (
        <div className="m-3 col-12 d-flex flex-column align-items-center border border-secondary rounded pt-4">
          <h4 htmlFor="desc">
            {props.date}
            {props.date ===
              new Date(Date.now()).toLocaleDateString("en-US", options) &&
              " (Today)"}
          </h4>
          <br />
          <label htmlFor="img">
            <img src={props.img} alt="img" />
          </label>
          <br />
          <label htmlFor="desc" id="desc">
            Weather Description :{" "}
            {props.desc.charAt(0).toUpperCase() + props.desc.slice(1)}
          </label>
          <br />
          <label htmlFor="temp">
            Temperature : {props.temp}°C
          </label>
          <br />
          <label htmlFor="humidity">
            Humidity : {props.humid}%
          </label>
          <br />
          <label htmlFor="wind">
            Wind Speed : {props.wind}m/s
          </label>
          <br />
        </div>
      ) : (
        <div className="m-3 col-12 col-sm-6 col-lg-3 d-flex flex-column align-items-center border border-secondary rounded pt-4">
          <h4 htmlFor="desc">{props.date}</h4>
          <br />
          <label htmlFor="img">
            <img src={props.img} alt="img" />
          </label>
          <br />
          <label htmlFor="desc">
            Weather Description :{" "}
            {props.desc.charAt(0).toUpperCase() + props.desc.slice(1)}
          </label>
          <br />
          <label htmlFor="temp">
            Temperature : {props.temp}°C
          </label>
          <br />
        </div>
      )}
    </>
  );
}
