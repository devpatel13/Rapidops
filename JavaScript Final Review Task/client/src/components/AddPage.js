import { React, useState, useEffect } from "react";
import { resolvePath, useNavigate } from "react-router-dom";

const AddPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/addpage", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (!data.isAuthenticated) {
          alert("Login first");
          navigate("/login");
        }
      });
  }, []);

  const [page, setPage] = useState({
    title: "",
    subTitle: "",
    bodyContent: "",
    slug: "",
    createdBy: "",
    showAuth: false,
    toBePublished: false,
    publishDate: undefined,
    publishTime: undefined,
  });

  let name, value;
  const handleInputs = (e) => {
    name = e.target.id;
    if (e.target.type === "checkbox") {
      console.log(e.target.checked);
      value = e.target.checked;
    } else value = e.target.value;

    setPage({ ...page, [name]: value });
  };

  const postPage = async (e) => {
    e.preventDefault();

    const {
      title,
      subTitle,
      bodyContent,
      slug,
      showAuth,
      toBePublished,
      publishDate,
      publishTime,
    } = page;

    try {
      const response = await fetch("/addpage", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          subTitle,
          bodyContent,
          slug,
          //   createdBy,
          showAuth,
          toBePublished,
          publishDate,
          publishTime,
        }),
      });

      if (response) {
        const isPageAdded = await response.json();
        if (response.status === 401 || !isPageAdded)
          alert("Fill all the Fields");
        else if (response.status === 409 || !isPageAdded)
          alert("The URL already exists");
        else if (response.status === 201) {
          alert("Page created");
          // navigate('/allpages')
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const publishPage = async (e) => {};

  return (
    <div className="form-wrapper">
      <form id="addPageForm" onChange={handleInputs}>
        <label htmlFor="title">Title:</label>
        <input id="title" type="text" placeholder="Title" value={page.title} />
        <label htmlFor="subTitle">Subtitle:</label>
        <input
          id="subTitle"
          type="text"
          placeholder="Subtitle"
          value={page.subTitle}
        />
        <label htmlFor="bodyContent">Body Content:</label>
        <input
          id="bodyContent"
          type="text"
          placeholder="Bodycontent"
          value={page.bodyContent}
        />
        <label htmlFor="slug">URL:</label>
        <input id="slug" type="text" placeholder="URL" value={page.slug} />
        <input id="showAuth" type="checkbox" value={page.showAuth} />
        <label htmlFor="showAuth">Show Author</label>
        <button type="button" onClick={postPage}>
          Save
        </button>
        <button type="button" onClick={publishPage}>
          Publish
        </button>
      </form>
    </div>
  );
};

export default AddPage;
