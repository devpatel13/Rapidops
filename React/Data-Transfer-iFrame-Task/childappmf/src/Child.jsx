import React, { useState } from "react";

export default function Child({ senData }) {
  const sendDataToChild = (e) => {
    // window.childData = { name };
    // window.handleChildTrigeredEvent({ name });
    document.dispatchEvent(
      new CustomEvent("childTrigger", { detail: { name } })
    );
  };
  const [name, setName] = useState("");
  return (
    <div className="App">
      <label htmlFor="name">Enter your name:</label>
      <p>hi</p>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={(e) => sendDataToChild(e)}>Click me</button>
    </div>
  );
}
