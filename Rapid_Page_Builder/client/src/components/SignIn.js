import { React, useState } from "react";
import { Link, NavLink, json, useNavigate } from "react-router-dom";
import loginLogo from "../img/loginLogo.png";

const SignIn = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    isSubscribed: false,
  });

  let name, value;
  const handleInputs = (e) => {
    name = e.target.id;
    if (e.target.type === "checkbox") {
      console.log(e.target.checked);
      value = e.target.checked;
    } else value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const signInUser = async (e) => {
    e.preventDefault();

    try {
      const { username, email, password, isSubscribed } = user;
      const response = await fetch("/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
          isSubscribed,
        }),
      });

      const isSignedIn = await response.json();
      if (response.status === 400 || !isSignedIn) alert("Registraion Failed");
      else if (response.status === 409 || !isSignedIn)
        alert("User Already Exists");
      else {
        alert("Registration Successful");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }

    // for (let elem in user) {
    //   console.log(elem, user[elem]);
    // }
  };

  return (
    <div className="signInLoginDiv">
      <div className="logo">
        <img src={loginLogo} />
      </div>
      <div className="signInLoginFormDiv">
        <h2>Register</h2>
        <form id="signInLoginForm" onChange={handleInputs}>
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            className="input-field"
            type="text"
            placeholder="Enter Username"
            value={user.username}
          />
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            className="input-field"
            type="email"
            placeholder="Enter Email"
            value={user.email}
          />
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            className="input-field"
            type="password"
            placeholder="Enter Password"
            value={user.password}
          />
          <div className="chekboxDiv">
            <input
              id="isSubscribed"
              type="checkbox"
              value={user.isSubscribed}
            />
            <label htmlFor="isSubscribed" id="isSubscribedCheckbox">
              Subscribe to our newsletter
            </label>
            <p>
              Your personal data will be used to support your experience
              throughout this website, to manage access to your account, and for
              other purposes described in our{" "}
              <NavLink to="https://pngtree.com/so/avatar">
                privacy policy
              </NavLink>
              .
            </p>
          </div>
          <button type="button" onClick={signInUser}>
            SignIn
          </button>
          <p id="linkToSignupLogin">
            Already a User? <Link to={"/login"}>Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;

{
  /* <div className="form-wrapper">
      <form id="signInForm" onChange={handleInputs}>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          placeholder="Enter Username"
          value={user.username}
        />
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          placeholder="Enter Email"
          value={user.email}
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          placeholder="Enter Password"
          value={user.password}
        />
        <input id="isSubscribed" type="checkbox" value={user.isSubscribed} />
        <button type="button" onClick={signInUser}>
          SignIn
        </button>
        <Link to={"/login"}>Already a user? Login</Link>
      </form>
    </div> */
}
