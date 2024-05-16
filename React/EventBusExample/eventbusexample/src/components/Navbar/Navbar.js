import React, { useEffect, useState } from "react";
import "./Navbar.css"; // Import your CSS file for styling
import eventBus from "../../utils/eventBus";

const Navbar = () => {
  const [cop, setCop] = useState("");
  console.log("in");
  useEffect(() => {
    eventBus.subscribe((event) => {
      if (event.type === "TEXT_COPIED") handleEvent();
    });
  }, []);
  const handleEvent = () => setCop("copied");
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1>BlogPage</h1>
      </div>
      <div className="navbar-right">
        {/* Add notifications div here */}
        <div className="notifications" id="notifications">
          {cop}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
