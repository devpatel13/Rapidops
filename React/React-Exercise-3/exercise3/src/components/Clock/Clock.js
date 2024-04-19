import React, { useEffect, useRef, useState } from "react";
import "./style.css";

export default function Clock() {
  const [clockData, setClockData] = useState({});
  const timerID = useRef(null);

  useEffect(() => {
    console.log("in");
    timerID.current = setInterval(() => {
      console.log("in");
      setClockData({ colon: ":", ...getDateObj() });
    }, 1000);
    return () => clearInterval(timerID.current);
  }, []);

  const getDateObj = () => {
    const currDate = new Date();
    let temp;
    const dateObj = {};
    dateObj.year = currDate.getFullYear();
    dateObj.month = currDate.toLocaleDateString(undefined, { month: "long" });
    dateObj.date = currDate.getDate();
    dateObj.day = currDate.toLocaleDateString(undefined, { weekday: "long" });
    temp = currDate.getHours();
    if (temp > 12) {
      dateObj.hours = temp % 12;
      dateObj.period = "PM";
    } else {
      dateObj.hours = temp;
      dateObj.period = "AM";
    }
    dateObj.minutes = currDate.getMinutes();
    dateObj.seconds = currDate.getSeconds();
    console.log(dateObj);
    // dateObj.
    return dateObj;
  };
  return (
    <div className="clock">
      <div className="day">
        <h1>{clockData.day}</h1>
      </div>
      <div className="time">
        <div className="col1">
          <h1>{clockData.hours}</h1>
          <h1>{clockData.colon}</h1>
          <h1>{clockData.minutes}</h1>
        </div>
        <div className="col2">
          <h1>{clockData.period}</h1>
          <h1>{clockData.seconds}</h1>
        </div>
      </div>
      <div className="date">
        <h1>{clockData.month}</h1>
        <h1>{clockData.date}</h1>
        <h1>{clockData.year}</h1>
      </div>
    </div>
  );
}
