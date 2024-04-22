import React from "react";

export default function Home(props) {
  const { logInDetails, setIsLoggedIn } = props;
  return (
    <div>
      <h1>
        Hello {logInDetails.username}, your email is {logInDetails.email}
      </h1>
      <button onClick={setIsLoggedIn}>Logout</button>
    </div>
  );
}
