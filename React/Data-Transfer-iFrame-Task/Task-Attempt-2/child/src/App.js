import "./App.css";
import React, { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const sendDataToParent = () => {};
  return (
    <div className="App">
      <h2>Child</h2>
      <label htmlFor="name">Enter your name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={(e) => sendDataToParent(e)}>Click me</button>
    </div>
  );
}

export default App;
