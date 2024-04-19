import React, { Component } from "react";
import "./style.css";

export class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.setState({ colon: ":", ...this.getDateObj() }),
      1000
    );
    // console.log(this.getDateObj());
  }

  shouldComponentUpdate() {
    return true;
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  getDateObj() {
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
    // dateObj.
    return dateObj;
  }

  render() {
    return (
      <div className="clock">
        <div className="day">
          <h1>{this.state.day}</h1>
        </div>
        <div className="time">
          <div className="col1">
            <h1>{this.state.hours}</h1>
            <h1>{this.state.colon}</h1>
            <h1>{this.state.minutes}</h1>
          </div>
          <div className="col2">
            <h1>{this.state.period}</h1>
            <h1>{this.state.seconds}</h1>
          </div>
        </div>
        <div className="date">
          <h1>{this.state.month}</h1>
          <h1>{this.state.date}</h1>
          <h1>{this.state.year}</h1>
        </div>
      </div>
    );
  }
}

export default Clock;
