import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [dataFromParent, setDataFromParent] = useState("");
  useEffect(() => {
    // const iFrameWindow = iframeRef.current.contentWindow;
    // console.log(iFrameWindow);
    // iFrameWindow.myVar = "hi";
    const handleParentTrigeredEvent = (data) => {
      console.log("trigger child", console.log(data.detail.name));
      setDataFromParent(data.detail.name);
    };
    document.addEventListener("parentTrigger", handleParentTrigeredEvent);
    return () => {
      document.removeEventListener("parentTrigger", handleParentTrigeredEvent);
    };
  });
  const sendDataToParent = (e) => {
    // window.childData = { name };
    // window.handleChildTrigeredEvent({ name });
    document.dispatchEvent(
      new CustomEvent("childTrigger", { detail: { name } })
    );
  };
  const [name, setName] = useState("");
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
      <p id="parentData">Data From Parent: {dataFromParent}</p>
    </div>
  );
}

export default App;
