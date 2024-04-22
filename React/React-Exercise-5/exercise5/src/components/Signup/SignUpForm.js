import React, { useState } from "react";
import "./SignUpForm.css";

const SignUpForm = ({ loginSignUpToggle }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setError] = useState({
    emailError: false,
    passwordError: false,
    confirmPasswordError: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      validateEmail(formData.email) &&
      validatePassword(formData.password) &&
      matchPassword(formData.password, formData.confirmPassword)
    ) {
      const data = localStorage.getItem("users");
      if (data !== null) {
        let users = JSON.parse(data);
        for (const user of users) {
          if (formData.username === user[0] || formData.email === user[1]) {
            alert("Username or email already exists");
            return;
          }
        }
        users.push([formData.username, formData.email, formData.password]);
        console.log(users);
        localStorage.setItem("users", JSON.stringify(users));
        alert("User Logged In go to Login Page");
      } else {
        localStorage.setItem(
          "users",
          JSON.stringify([
            [formData.username, formData.email, formData.password],
          ])
        );
        alert("User Logged In go to Login Page");
      }
    } else alert("Invalid Form Details");

    console.log(formData);
  };

  const validateEmail = (email) => {
    const emailRegEx = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/;
    const errObject = errors;
    if (!emailRegEx.test(email)) {
      errObject.emailError = true;
      setError(errObject);
      showErrors();
      return false;
    } else {
      errObject.emailError = false;
      setError(errObject);
      if (document.getElementById("emailError"))
        document.getElementById("emailError").remove();
      return true;
    }
  };

  const validatePassword = (password) => {
    const passwordRegEx =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
    const errObject = errors;
    if (!passwordRegEx.test(password)) {
      errObject.passwordError = true;
      setError(errObject);
      showErrors();
      return false;
    } else {
      errObject.passwordError = false;
      setError(errObject);
      if (document.getElementById("passwordError"))
        document.getElementById("passwordError").remove();
      return true;
    }
  };

  const matchPassword = (password, confirmPassword) => {
    const errObject = errors;
    if (!(password === confirmPassword)) {
      errObject.confirmPasswordError = true;
      setError(errObject);
      showErrors();
      return false;
    } else {
      errObject.confirmPasswordError = false;
      setError(errObject);
      if (document.getElementById("confirmPasswordError"))
        document.getElementById("confirmPasswordError").remove();
      return true;
    }
  };

  const showErrors = () => {
    for (const error in errors) {
      switch (error) {
        case "emailError":
          console.log(errors[error]);
          if (errors[error] && !document.getElementById(error))
            createErrorElem("email", error, "Invalid Email.");
          break;
        case "passwordError":
          if (errors[error] && !document.getElementById(error))
            createErrorElem("password", error, "Invalid Password.");
          break;
        case "confirmPasswordError":
          if (errors[error] && !document.getElementById(error))
            createErrorElem(
              "confirmPassword",
              error,
              "Password and Confirm Password do not match."
            );
          break;

        default:
          break;
      }
    }
  };

  const createErrorElem = (siblingElemID, errorID, error) => {
    const pElem = document.createElement("p");
    pElem.id = errorID;
    pElem.style = "color:red";
    pElem.innerText = error;
    document.getElementById(siblingElemID).after(pElem);
    document.getElementById(siblingElemID).focus();
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={() => validateEmail(formData.email)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={() => validatePassword(formData.password)}
            required
          />
          <p style={{ color: "gray" }}>
            Password should contain at least one digit, one lowercase letter,
            one uppercase letter, one special character, and is at least 8
            characters long.
          </p>
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={() =>
              matchPassword(formData.password, formData.confirmPassword)
            }
            required
          />
        </div>
        <button type="submit">Sign Up</button>
        <p>
          Already a user?{" "}
          <span onClick={loginSignUpToggle} id="loginSignUpToggle">
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
