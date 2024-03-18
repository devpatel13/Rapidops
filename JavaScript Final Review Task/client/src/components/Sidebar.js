import React from "react";
import { Nav } from "react-bootstrap";
import logo from "../img/logo.png";
import dashboardImg from "../img/dashboardImg.png";
import line from "../img/line.png";
import libraryImg from "../img/libraryImg.png";
import notifImg from "../img/notifImg.png";
import pfp1 from "../img/1.png";

const Sidebar = () => {
  return (
    <Nav className="sidebar">
      <div className="sidebar-sticky">
        <Nav.Item id="navItem1">
          <img src={logo} />
        </Nav.Item>
        <Nav.Item id="navItem2">
          <img src={dashboardImg} className="sidebarImgs" />
          <img src={line} />
          <img src={libraryImg} className="sidebarImgs" />
        </Nav.Item>
        <Nav.Item id="navItem3">
          <img src={notifImg} className="sidebarImgs" />
          <img src={pfp1} className="sidebarImgs" />
        </Nav.Item>
      </div>
    </Nav>
  );
};

export default Sidebar;
