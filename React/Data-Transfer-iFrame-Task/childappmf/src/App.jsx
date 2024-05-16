import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Child from "./Child";

import "./index.css";

const App = () => <Child />;
ReactDOM.render(<App />, document.getElementById("app"));
