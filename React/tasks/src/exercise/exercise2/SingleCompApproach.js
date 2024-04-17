import React, { Component } from "react";

export class SingleCompApproach extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "First Name",
      lastName: "Last Name",
      names: [],
      index: null,
    };
  }

  addName = (e) => {
    if (e.target.id !== "addBtn") return;
    let firstName = document.getElementById("fname").value;
    let lastName = document.getElementById("lname").value;
    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
    if (!firstName.trim() || !lastName.trim()) {
      alert("Name cannot be null");
      return;
    }
    firstName = firstName.trim();
    lastName = lastName.trim();
    firstName = firstName[0].toUpperCase() + firstName.slice(1).toLowerCase();
    lastName = lastName[0].toUpperCase() + lastName.slice(1).toLowerCase();
    console.log(firstName, lastName);

    if (
      undefined ===
      this.state.names.find(
        (elem) => elem.firstName === firstName && elem.lastName === lastName
      )
    )
      this.setState({ names: [...this.state.names, { firstName, lastName }] });
    else {
      alert("Name already Exists");
      return;
    }
  };

  editName = (index) => {
    let deleteBtns = document.querySelectorAll(".delete");
    for (let deleteBtn of deleteBtns) {
      deleteBtn.disabled = true;
    }
    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
    this.setState(
      {
        firstName: this.state.names[index].firstName,
        lastName: this.state.names[index].lastName,
      },
      () => console.log(this.state)
    );
    this.setState({ index });
    document.getElementById("addBtn").hidden = true;
    document.getElementById("updateBtn").hidden = false;
  };

  updateName = (e) => {
    if (e.target.id !== "updateBtn") return;
    let firstName = document.getElementById("fname").value;
    let lastName = document.getElementById("lname").value;
    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
    if (!firstName || !lastName) {
      alert("Name cannot be null");
      document.getElementById("updateBtn").hidden = true;
      document.getElementById("addBtn").hidden = false;
      let deleteBtns = document.querySelectorAll(".delete");
      for (let deleteBtn of deleteBtns) {
        deleteBtn.disabled = false;
      }
      this.setState({
        firstName: "First Name",
        lastName: "Last Name",
        index: null,
      });
      return;
    }
    firstName = firstName.trim();
    lastName = lastName.trim();
    firstName = firstName[0].toUpperCase() + firstName.slice(1).toLowerCase();
    lastName = lastName[0].toUpperCase() + lastName.slice(1).toLowerCase();
    console.log(firstName, lastName);
    const tempNames = this.state.names;

    tempNames[this.state.index] = { firstName, lastName };
    console.log(tempNames);
    this.setState(
      {
        names: tempNames,
        index: null,
        firstName: "First Name",
        lastName: "Last Name",
      },
      () => console.log(this.state)
    );
    let deleteBtns = document.querySelectorAll(".delete");
    for (let deleteBtn of deleteBtns) {
      deleteBtn.disabled = false;
    }
    document.getElementById("addBtn").hidden = false;
    document.getElementById("updateBtn").hidden = true;
  };

  deleteName = (e, index) => {
    // console.log(e.target.value);
    // if (e.target.value !== "deleteBtn") return;
    let tempName = this.state.names;
    tempName.splice(index, 1);
    this.setState(
      {
        names: tempName,
      },
      () => console.log(this.state)
    );
  };

  render() {
    return (
      <div className="d-flex flex-column min-vh-100 min-vw-100">
        <div className="d-flex flex-grow-1 justify-content-center align-items-center flex-column gap-5">
          <div className="input-group w-50">
            <span className="input-group-text">First and last name</span>
            <input
              type="text"
              placeholder={this.state.firstName}
              id="fname"
              className="form-control"
            />
            <input
              type="text"
              placeholder={this.state.lastName}
              id="lname"
              className="form-control"
            />
            <button
              type="button"
              className="btn btn-primary"
              id="addBtn"
              onClick={(e) => {
                this.addName(e);
              }}
            >
              Add
            </button>
            <button
              type="button"
              className="btn btn-primary"
              id="updateBtn"
              hidden
              onClick={(e) => {
                this.updateName(e);
              }}
            >
              Update
            </button>
          </div>
          <div
            className="d-flex flex-column gap-3 container text-center w-50"
            id="nameList"
            onClick={this.addName}
          >
            {this.state.names.map((name, index) => (
              <div
                className="row justify-content-around column-gap-3"
                key={index}
              >
                <div className="col d-flex border border-secondary text-bg-light p-1 justify-content-start">
                  {name.firstName}
                </div>
                <div className="col d-flex border border-secondary text-bg-light p-1 justify-content-start">
                  {name.lastName}
                </div>
                <div className="col-2 d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-info me-1 btn-sm px-3 edit"
                    value="edit"
                    onClick={() => {
                      this.editName(index);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm delete"
                    value="delete"
                    onClick={(event) => this.deleteName(event, index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default SingleCompApproach;
