import React, { useEffect } from "react";
import "./Navbar.css"; // Import your CSS file for styling
import eventBus from "../../utils/eventBus";

const Navbar = () => {
  useEffect(() => {
    eventBus.subscribe((event) => {
      if (event.type === "TEXT_COPIED") handleEvent();
    });
  }, []);
  const handleEvent = () =>
    (document.getElementById("notifications").innerText = "Copied");
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>BlogPage</h1>
      </div>
      <div className="navbar-right">
        {/* Add notifications div here */}
        <div className="notifications" id="notifications"></div>
      </div>
    </nav>
  );
};

export default Navbar;
