import React, { Component } from "react";
import "./style.css";
// import Container from "react-bootstrap/Container";

export class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      btnType: "Add",
    };
  }

  handleClick = () => {
    const { firstName, lastName } = this.state;
    if (!firstName || !lastName) {
      alert("Name cannot be null");
      return;
    }
    let fullNameKey = firstName.toLowerCase() + lastName.toLowerCase();
    this.props.sendInput(fullNameKey);
  };

  render() {
    return (
      <div className="input-group w-50">
        <span className="input-group-text">First and last name</span>
        <input
          type="text"
          aria-label="First name"
          id="fname"
          className="form-control"
          value={this.state.firstName}
          onChange={(e) => this.setState({ firstName: e.target.value })}
        />
        <input
          type="text"
          aria-label="Last name"
          id="lname"
          className="form-control"
          value={this.state.lastName}
          onChange={(e) => this.setState({ lastName: e.target.value })}
        />
        <button
          type="button"
          className="btn btn-primary"
          id="addBtn"
          onClick={this.handleClick}
        >
          Add
        </button>
        <button type="button" className="btn btn-primary" id="updateBtn" hidden>
          Update
        </button>
      </div>
    );
  }
}

export default Input;
