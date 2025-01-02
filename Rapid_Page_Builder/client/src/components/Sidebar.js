import React from "react";
import { Nav } from "react-bootstrap";
import logo from "../img/logo.png";
import dashboardImg from "../img/dashboardImg.png";
import line from "../img/line.png";
import libraryImg from "../img/libraryImg.png";
import notifImg from "../img/notifImg.png";
import pfp1 from "../img/1.png";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const goToDashboardNav = () => {
    navigate("/");
  };
  const goToAllPagesNav = () => {
    navigate("/allpages");
  };
  const logout = async () => {
    try {
      const response = await fetch("/logout", {
        method: "GET",
      });
      if (response.status === 200) {
        alert("logged out");
        navigate("/login");
      } else alert("error logging out");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Nav className="sidebar">
      <div className="sidebar-sticky">
        <Nav.Item id="navItem1">
          <img src={logo} />
        </Nav.Item>
        <Nav.Item id="navItem2">
          <img
            src={dashboardImg}
            className="sidebarImgs"
            onClick={goToDashboardNav}
          />
          <img src={line} />
          <img
            src={libraryImg}
            className="sidebarImgs"
            onClick={goToAllPagesNav}
          />
        </Nav.Item>
        <Nav.Item id="navItem3">
          <i class="fa-solid fa-right-from-bracket" onClick={logout}></i>
          <img src={notifImg} className="sidebarImgs" />
          <img src={pfp1} className="sidebarImgs" />
        </Nav.Item>
      </div>
    </Nav>
  );
};

export default Sidebar;
