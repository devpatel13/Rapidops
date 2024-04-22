import React, { useState } from "react";

export default function Login(props) {
  const { loginSignUpToggle, setLoginDetails, setIsLoggedIn } = props;
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [isValidCredentials, setIsValidCredentials] = useState(true);
  const [isAuthorised, setIsAuthorised] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = localStorage.getItem("users");
    if (data !== null) {
      let users = JSON.parse(data);
      for (const user of users) {
        if (loginData.email === user[1]) {
          if (loginData.password === user[2]) {
            alert("User logged in");
            setIsAuthorised(true);
            setLoginDetails({ username: user[0], email: user[1] });
            console.log("in");
            setIsLoggedIn();
          } else setIsValidCredentials(!isValidCredentials);
        }
      }
      setIsValidCredentials(!isValidCredentials);
    } else {
      setIsAuthorised(!isAuthorised);
    }
  };
  return (
    <div className="container">
      <h2>Login</h2>
      <p style={{ color: "red" }} hidden={!isAuthorised}>
        User Does not exists.
      </p>
      <p style={{ color: "red" }} hidden={isValidCredentials}>
        Invalid Credentials
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
        <p>
          New user?{" "}
          <span onClick={loginSignUpToggle} id="loginSignUpToggle">
            Sign In
          </span>
        </p>
      </form>
    </div>
  );
}
