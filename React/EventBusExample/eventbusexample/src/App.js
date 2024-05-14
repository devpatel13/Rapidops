import React from "react";
import "./App.css";
import BlogPage from "./components/BlogPage/BlogPage";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <BlogPage />
    </div>
  );
}

export default App;
