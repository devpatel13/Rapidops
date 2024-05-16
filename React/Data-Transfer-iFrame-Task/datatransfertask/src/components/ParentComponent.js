import React, { useEffect, useState, useRef } from "react";
import { HTMLString } from "../utils/globalVars";

const ParentComponent = () => {
  console.log("in");

  const [dataFromChild, setDataFromChild] = useState("");
  const [pname, setpName] = useState("");
  useEffect(() => {
    // const iFrameWindow = iframeRef.current.contentWindow;
    // console.log(iFrameWindow);
    // iFrameWindow.myVar = "hi";
    const handleChildTrigeredEvent = (data) => {
      console.log("trigger");
      setDataFromChild(data.detail.name);
    };
    document.addEventListener("childTrigger", handleChildTrigeredEvent);
    return () => {
      document.removeEventListener("childTrigger", handleChildTrigeredEvent);
    };
  });
  const sendDataToChild = () => {
    document.dispatchEvent(
      new CustomEvent("parentTrigger", { detail: { name: pname } })
    );
  };
  return (
    <div>
      <h2>Parent</h2>
      <label htmlFor="pname">Enter your name:</label>
      <input
        type="text"
        id="pname"
        value={pname}
        onChange={(e) => setpName(e.target.value)}
      />
      <button onClick={(e) => sendDataToChild(e)}>Click me</button>
      <p id="childData">Data From Child: {dataFromChild}</p>
      {/* <iframe
        src="http://localhost:3001/"
        ref={iframeRef}
        title="Embedded Content"
        width="100%"
        height="400px"
        frameBorder="0"
        allowFullScreen
      /> */}
    </div>
  );
};

export default ParentComponent;
