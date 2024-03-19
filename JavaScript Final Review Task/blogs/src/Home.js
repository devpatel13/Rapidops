import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Navbar, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from "./logo.png";

const Home = () => {
  const navigate = useNavigate();
  const [pages, setPageData] = useState([]);
  //   let page = [];

  useEffect(() => {
    fetch("/allpublishedpages", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        let tempData = data.pages.map((elem) => ({
          title: elem.title,
          subTitle: elem.subTitle,
          slug: elem.slug,
        }));
        setPageData(tempData);
      });
  }, []);

  function goToPage(slug) {
    navigate(`/${slug}`);
  }

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Navbar.Brand>
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          Blogs
        </Navbar.Brand>
      </Navbar>
      <div className="cards">
        {pages.map((row, index) => (
          <div
            className="card"
            key={index} // Use a unique key for each element
            onClick={() => {
              goToPage(row.slug);
            }}
          >
            <div className="card-content">
              <h2 className="card-title">{row.title}</h2>
              <p className="card-subtitle">{row.subTitle}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
