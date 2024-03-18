import React, { useState } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import loginLogo from "../img/loginLogo.png";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    const response = await fetch("/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    console.log(response);
    try {
      if (response) {
        // const isLoggedIn = await response.json();
        if (response.status === 400 || response.status === 401)
          alert("Invalid Credentials");
        else {
          alert("User Logged In");
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="signInLoginDiv">
      <div className="logo">
        <img src={loginLogo} />
      </div>
      <div className="signInLoginFormDiv">
        <h2>Login</h2>
        <form id="signInLoginForm">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            type="text"
            className="input-field"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="text"
            className="input-field"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" onClick={loginUser}>
            Login
          </button>
          <p id="linkToSignupLogin">
            New Here? <Link to={"/signup"}>SignIn</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;

{
  /* <div className="form-wrapper">
      <form id="loginForm">
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="text"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" onClick={loginUser}>
          Login
        </button>
        <Link to={"/signup"}>New Here? SignIn</Link>
      </form>
    </div> */
}
