import React, { useState } from "react";

export default function Table() {
  const [firstName, setFirstName] = useState("First Name");
  const [lastName, setLastName] = useState("Last Name");
  const [names, setNames] = useState([]);
  const [index, setIndex] = useState(null);

  const addName = (e) => {
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
      names.find(
        (elem) => elem.firstName === firstName && elem.lastName === lastName
      )
    ) {
      const tempNames = [...names];
      tempNames.push({ firstName, lastName });
      setNames(tempNames);
    } else {
      alert("Name already Exists");
      return;
    }
  };

  const editName = (index) => {
    let deleteBtns = document.querySelectorAll(".delete");
    for (let deleteBtn of deleteBtns) {
      deleteBtn.disabled = true;
    }
    document.getElementById("fname").value = "";
    document.getElementById("lname").value = "";
    setFirstName(names[index].firstName);
    setLastName(names[index].lastName);
    setIndex(index);
    document.getElementById("addBtn").setAttribute("hidden", "");
    document.getElementById("updateBtn").removeAttribute("hidden");
  };

  const updateName = (e) => {
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
      setFirstName("First Name");
      setLastName("Last Name");
      setIndex(null);
      return;
    }
    firstName = firstName.trim();
    lastName = lastName.trim();
    firstName = firstName[0].toUpperCase() + firstName.slice(1).toLowerCase();
    lastName = lastName[0].toUpperCase() + lastName.slice(1).toLowerCase();
    console.log(firstName, lastName);
    const tempNames = [...names];

    tempNames[index] = { firstName, lastName };
    console.log(tempNames);
    setNames(tempNames);
    setFirstName("First Name");
    setLastName("Last Name");
    setIndex(null);

    let deleteBtns = document.querySelectorAll(".delete");
    for (let deleteBtn of deleteBtns) {
      deleteBtn.disabled = false;
    }
    document.getElementById("addBtn").hidden = false;
    document.getElementById("updateBtn").hidden = true;
  };

  const deleteName = (e, index) => {
    // console.log(e.target.value);
    // if (e.target.value !== "deleteBtn") return;
    let tempName = [...names];
    tempName.splice(index, 1);
    setNames(tempName);
  };
  return (
    <div className="d-flex flex-column min-vh-100 min-vw-100">
      <div className="d-flex flex-grow-1 justify-content-center align-items-center flex-column gap-5">
        <div className="input-group w-50">
          <span className="input-group-text">First and last name</span>
          <input
            type="text"
            placeholder={firstName}
            id="fname"
            className="form-control"
          />
          <input
            type="text"
            placeholder={lastName}
            id="lname"
            className="form-control"
          />
          <button
            type="button"
            className="btn btn-primary"
            id="addBtn"
            onClick={(e) => {
              addName(e);
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
              updateName(e);
            }}
          >
            Update
          </button>
        </div>
        <div
          className="d-flex flex-column gap-3 container text-center w-50"
          id="nameList"
          //   onClick={addName}
        >
          {names.map((name, index) => (
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
                    editName(index);
                  }}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger btn-sm delete"
                  value="delete"
                  onClick={(event) => deleteName(event, index)}
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
