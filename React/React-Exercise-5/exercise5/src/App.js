import { useState } from "react";
import "./App.css";
import SignUpForm from "./components/Signup/SignUpForm";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";

function App() {
  const [showLoginPage, setShowLoginPage] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logInDetails, setLogInDetails] = useState({});
  const setLoginDetailsCallback = (userDetails) => {
    setLogInDetails(userDetails);
    console.log(logInDetails);
  };
  const setIsLoggedInCallback = () => {
    setIsLoggedIn(!isLoggedIn);
  };
  const loginSignUpToggle = () => {
    setShowLoginPage(!showLoginPage);
  };
  return (
    <>
      {showLoginPage && !isLoggedIn ? (
        <Login
          loginSignUpToggle={loginSignUpToggle}
          setIsLoggedIn={setIsLoggedInCallback}
          setLoginDetails={setLoginDetailsCallback}
        />
      ) : null}
      {!showLoginPage && !isLoggedIn ? (
        <SignUpForm loginSignUpToggle={loginSignUpToggle} />
      ) : null}
      {isLoggedIn ? (
        <Home
          logInDetails={logInDetails}
          setIsLoggedIn={setIsLoggedInCallback}
        />
      ) : null}
    </>
  );
}

export default App;
