import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Child from "childappmf/Child";

import "./index.css";

const App = () => {
  const [childData, setChildData] = useState("");
  useEffect(() => {
    const handleChildTrigeredEvent = (data) => {
      console.log(data.detail);
      setChildData(data.detail.name);
    };
    document.addEventListener("childTrigger", handleChildTrigeredEvent);
    return () => {
      document.removeEventListener("childTrigger", handleChildTrigeredEvent);
    };
  });
  return (
    <div className="container">
      <div>Name: parentapp</div>
      <p>Child Data: {childData}</p>
      <Child sendData={setChildData} />
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("app"));
