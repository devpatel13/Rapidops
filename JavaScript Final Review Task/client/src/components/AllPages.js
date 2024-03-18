import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AllPages = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState([]);

  useEffect(() => {
    fetch("/allpages", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.isAuthenticated) {
          alert("Login first");
          navigate("/login");
        } else {
          setPage(data.pages);
        }
      });
  }, []);

  return (
    <>
      {page.map((i) => {
        return <h2>{i.title}</h2>;
      })}
    </>
  );
};

export default AllPages;
