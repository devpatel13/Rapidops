import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import menuLogo from "../img/menu.png";
import searchLogo from "../img/search.png";
import { Form } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const AllPages = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState([]);
  const [searchString, setSearchString] = useState("");

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
          let tempData = [];
          console.log(data);
          data.pages.forEach((elem) => {
            const parsedCreatedAt = new Date(elem.createdAt);
            let parsedModifiedAt, status, modifiedBy;
            if (elem.modifiedBy) modifiedBy = elem.modifiedBy;
            else modifiedBy = "-";
            if (elem.modifiedAt) parsedModifiedAt = new Date(elem.modifiedAt);
            else parsedModifiedAt = "-";
            if (elem.toBePublished) {
              if (elem.publishTime < Date.now()) status = "published";
              else status = "scheduled";
            } else status = "saved";

            tempData.push({
              id: elem._id,
              title: elem.title,
              slug: elem.slug,
              createdBy: elem.createdBy,
              createdAt: parsedCreatedAt.toString().substring(0, 25),
              modifiedBy,
              modifiedAt: parsedModifiedAt.toString().substring(0, 25),
              status,
            });
          });
          setPage(tempData);
        }
      });
  }, []);

  const rowData = [
    {
      title: "Page 1",
      url: "/page1",
      createdBy: "Adam",
      createdAt: "date",
      modifiedBy: "Adam",
      modifiedAt: "date",
      status: "published",
    },
  ];

  const goToAddPage = () => {
    navigate("/addpage");
  };

  const goToEditPage = (id) => {
    navigate(`/editpage`, { state: { id: id } });
  };

  async function deletePage(e, id) {
    console.log(e.target.closest("tr"));
    const response = await fetch(`/allpages/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      alert("Page deleted");
      e.target.closest("tr").remove();
    } else alert("Page not deleted");
  }

  return (
    <>
      <Sidebar />
      <div className="allPages">
        <div className="allPagesHeader">
          <img src={menuLogo} />
          <div className="allPagesheaderContent">
            <h3>Pages</h3>
            <p>Create and publish pages.</p>
          </div>
          <button type="button" onClick={goToAddPage}>
            + Add Page
          </button>
        </div>
        <div className="allPagesSearchMenu">
          <div className="searchBar">
            <img src={searchLogo} />
            <input
              id="searchBar"
              type="text"
              className="input-field"
              placeholder="Search"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
          </div>
          <p>3 records</p>
          <div className="filterTab">
            <div className="filterTabStatus">
              <p>Status</p>
              <Form.Select
                aria-label="Default select example"
                size="sm"
                className="searchSelect"
              >
                <option>All</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </div>
            <div className="filterTabCreatedBy">
              <p>Created By</p>
              <Form.Select
                aria-label="Default select example"
                size="sm"
                className="searchSelect"
              >
                <option>All</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </div>
          </div>
        </div>
        <div className="allPagesTable">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>URL</th>
                <th>Created By</th>
                <th>Created At</th>
                <th>Modified By</th>
                <th>Modified At</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {page.map((row, index) => (
                <tr key={index}>
                  <td className="allPagesTableTitle">
                    <DropdownButton
                      id="dropdown-basic-button"
                      title={row.title}
                    >
                      <Dropdown.Item
                        onClick={() => {
                          goToEditPage(row.id);
                        }}
                      >
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={(e) => {
                          deletePage(e, row.id);
                        }}
                      >
                        Delete
                      </Dropdown.Item>
                    </DropdownButton>
                  </td>
                  <td>{row.slug}</td>
                  <td>{row.createdBy}</td>
                  <td>{row.createdAt}</td>
                  <td>{row.modifiedBy}</td>
                  <td>{row.modifiedAt}</td>
                  <td>{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* {page.map((i) => {
        return <h2>{i.title}</h2>;
      })} */}
    </>
  );
};

export default AllPages;
