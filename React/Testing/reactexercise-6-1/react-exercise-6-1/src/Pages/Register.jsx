import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  //for maintaining user-fields
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
    retypePassword: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const regex = /[a-z0-9]+@[a-z]+\.[a-z]+/i;
    let flag = true;
    let errorMsg = "";
    let userArray = JSON.parse(localStorage.getItem("userInfo"));

    if (!credentials.username.trim()) {
      errorMsg += "Username is compulsory !\n";
      flag = false;
    } else if (credentials.username.trim().length < 3) {
      errorMsg += "Username should be at least 3 characters !\n";
      flag = false;
    } else if (
      credentials.username.trim() &&
      userArray &&
      userArray.some((user) => user.username === credentials.username.trim())
    ) {
      errorMsg += "Username already exist, try with other username !\n";
      flag = false;
    }
    if (!credentials.email.trim()) {
      errorMsg += "Email is compulsory !\n";
      flag = false;
    } else if (!regex.test(credentials.email)) {
      errorMsg += "Enter valid e-mail !\n";
      flag = false;
    } else if (
      credentials.email.trim() &&
      userArray &&
      userArray.some((user) => user.email === credentials.email.trim())
    ) {
      errorMsg += "User exist with this e-mail, register with other e-mail !\n";
      flag = false;
    }

    if (!credentials.password.trim()) {
      errorMsg += "Password is compulsory !\n";
      flag = false;
    }
    if (credentials.password.trim() && credentials.password.length < 5) {
      errorMsg += "Password should be at least 5 characters !\n";
      flag = false;
    }
    if (credentials.password.trim() && !credentials.retypePassword.trim()) {
      errorMsg += "Re-type Password is compulsory !\n";
      flag = false;
    } else if (
      credentials.password.trim() &&
      credentials.retypePassword.trim() &&
      credentials.password !== credentials.retypePassword
    ) {
      errorMsg += "Password and Confirm password should be same !\n";
      flag = false;
    }
    if (errorMsg) {
      //to show all error message cumulatively
      alert(errorMsg);
    }

    //if true than only store userinfo and navigate to home page
    if (flag) {
      if (userArray) {
        let obj = {
          username: credentials.username.trim(),
          email: credentials.email.toLowerCase(),
          password: credentials.password,
        };
        userArray.push(obj);
        localStorage.setItem("userInfo", JSON.stringify(userArray));
      } else {
        //for first time storing
        let arr = [];
        let obj = {
          username: credentials.username.trim(),
          email: credentials.email.toLowerCase(),
          password: credentials.password,
        };
        arr.push(obj);
        localStorage.setItem("userInfo", JSON.stringify(arr));
      }
      localStorage.setItem("loginas", JSON.stringify(credentials.email));
      navigate("/home");
    }
  };

  //onchange store value of user-field
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (localStorage.getItem("loginas")) {
      navigate("/home");
    }
  }, []);
  return (
    <div>
      <form className="container userform" onSubmit={handleSubmit}>
        <h3>Register Page</h3>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
            aria-describedby="emailHelp"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">E-mail address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            aria-describedby="emailHelp"
            placeholder="Enter your email address"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            placeholder="Enter Password"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="retypePassword">Re-type Password</label>
          <input
            type="password"
            className="form-control"
            id="retypePassword"
            name="retypePassword"
            value={credentials.retypePassword}
            onChange={handleChange}
            placeholder="Re-type Password"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="textonly">
            Already have an account? <Link to="/login">Login</Link>
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}
