import React from "react";
import "./App.css";
import BlogPage from "./components/BlogPage/BlogPage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <BlogPage />
      <Footer />
    </div>
  );
}

export default App;
