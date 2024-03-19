import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import addPageLogo from "../img/addPageLogo.png";
import Sidebar from "./Sidebar";

const Home = () => {
  const navigate = useNavigate();

  const goToAddPage = () => {
    navigate("/addpage");
  };

  return (
    <>
      <Sidebar />
      <div className="addPageDiv">
        <div className="addPageDivText">
          <h3>No pages found.</h3>
          <p>Looks like you don't have any pages yet.Let's add a new page</p>
          <button onClick={goToAddPage}>+ Add Page</button>
        </div>
        <div className="addPageDivImg">
          <img src={addPageLogo} />
        </div>
      </div>
    </>
  );
};

export default Home;
