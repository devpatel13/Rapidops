import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  //for maintaining user-fields
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const regex = /[a-z0-9]+@[a-z]+\.[a-z]+/i;
    let flag = true;
    let errorMsg = "";
    let userArray = JSON.parse(localStorage.getItem("userInfo"));

    if (!credentials.email.trim()) {
      errorMsg += "Email field is compulsory !\n";
      flag = false;
    } else if (!regex.test(credentials.email)) {
      errorMsg += "Enter valid e-mail !\n";
      flag = false;
    }

    if (!credentials.password.trim()) {
      errorMsg += "Password field is compulsory !\n";
      flag = false;
    } else if (credentials.password.length < 5) {
      errorMsg += "Password should be at atleast 5 characters !\n";
      flag = false;
    }

    //to get user if exist
    if (flag) {
      if (userArray) {
        let userFound = userArray.findIndex(
          (e) => e.email === credentials.email
        );

        if (userFound === -1) {
          errorMsg += "User with this e-mail does not exist !\n";
          flag = false;
        } else if (userArray[userFound].password !== credentials.password) {
          errorMsg += "Incorrect password !\n";
          flag = false;
        }
      } else {
        errorMsg += "User with this e-mail does not exist !\n";
        flag = false;
      }
    }

    if (errorMsg) {
      alert(errorMsg);
    }
    if (flag) {
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
        <h3>Login Page</h3>
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
          <label htmlFor="textonly">
            Don't have an account? <Link to="/">Register</Link>
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}
