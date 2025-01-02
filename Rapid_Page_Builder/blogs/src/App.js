import logo from "./logo.svg";
import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./Home";
import PreviewPage from "./PreviewPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* {!hideSidebar && <Sidebar />} */}
        <Route path="/" element={<Home />} />
        <Route path="/:slug" element={<PreviewPage />} />
      </Routes>
    </Router>
  );
}

export default App;
