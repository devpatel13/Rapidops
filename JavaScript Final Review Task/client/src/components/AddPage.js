import { React, useState, useEffect } from "react";
import { resolvePath, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import gearLogo from "../img/gear.png";
import { Modal, Button, Dropdown } from "react-bootstrap";
import "react-quill/dist/quill.snow.css";
import ReactQuill, { Quill } from "react-quill";
// import TextEditor from "./TextEditor";
const AddPage = () => {
  const navigate = useNavigate();
  const [author, setAuthor] = useState("");
  let toBePublished = false;
  const [files, setFiles] = useState([]);

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
        setAuthor(data.username);
      });
  }, []);

  const [page, setPage] = useState({
    title: "",
    subTitle: "",
    bodyContent: "",
    slug: "",
    createdBy: "",
    author: "",
    showAuth: false,
    publishDate: undefined,
    publishTime: undefined,
  });

  const [content, setContent] = useState("");
  const [show, setShow] = useState(false);

  let name, value;
  const handleInputs = (e) => {
    name = e.target.id;
    if (e.target.type === "checkbox") {
      console.log(e.target.checked);
      value = e.target.checked;
    } else value = e.target.value;

    setPage({ ...page, [name]: value });
  };
  const handleFileChange = (event) => {
    // Get selected files
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const postPage = async (e) => {
    e.preventDefault();

    const { title, subTitle, slug, showAuth, publishDate, publishTime } = page;

    const bodyContent = content;
    console.log(toBePublished);

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
          author,
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
          navigate("/allpages");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const goToAllPage = () => {
    navigate("/allpages");
  };

  const publishPage = async (e) => {
    e.preventDefault();
    toBePublished = true;
    console.log(toBePublished);
    postPage(e);
    handleClose();
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handlePreview = () => {
    console.log("Preview clicked");
    if (!page.title) alert("Title is necessary for Preview");
    else {
      localStorage.setItem(
        "blogData",
        JSON.stringify({
          title: page.title,
          subTitle: page.subTitle,
          bodyContent: page.bodyContent,
        })
      );
      window.open("/previewpage", "_blank");
    }
  };

  return (
    <>
      <Sidebar />
      <div className="addPage">
        <div className="addPageHeader">
          <div className="addPageHeaderContent">
            <i className="fa-solid fa-chevron-left"></i>
            <div>
              <h3>Untitled Document</h3>
            </div>
          </div>
          <div className="addPageHeaderButtons">
            <Dropdown>
              <Dropdown.Toggle variant="link" id="dropdown-basic">
                <img
                  src={gearLogo}
                  alt="Three dots"
                  style={{ width: "20px" }}
                />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={handlePreview}>Preview</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <button type="button" id="cancelBtn" onClick={goToAllPage}>
              Cancel
            </button>
            <button type="button" id="saveBtn" onClick={postPage}>
              Save
            </button>
            <button type="button" id="previewBtn" onClick={handleShow}>
              Publish
            </button>
          </div>
        </div>
        <div className="addPageContent">
          <form id="addPageForm" onChange={handleInputs}>
            <div className="formElem">
              <label htmlFor="title">Title:</label>
              <input
                id="title"
                type="text"
                placeholder="Title"
                value={page.title}
              />
            </div>
            <div className="formElem">
              <label htmlFor="subTitle">Subtitle:</label>
              <input
                id="subTitle"
                type="text"
                placeholder="Subtitle"
                value={page.subTitle}
              />
            </div>
            <div className="formElem">
              <label htmlFor="bodyContent">Body Content:</label>
              {/* <input
                id="bodyContent"
                type="textbox"
                placeholder="Bodycontent"
                value={page.bodyContent}
              /> */}
              <ReactQuill
                id="bodyContent"
                theme="snow"
                modules={modules}
                formats={formats}
                value={content}
                onChange={setContent}
              ></ReactQuill>
            </div>
            <div className="attachements">
              <label htmlFor="title">Attachements:</label>
              <input
                id="title"
                type="file"
                onChange={handleFileChange}
                multiple
              />
            </div>
          </form>

          <div className="pageMetaContent" onChange={handleInputs}>
            <div className="pageMetaContentHead">
              <h2>Configurations</h2>
            </div>
            <div className="pageMetaContentElem">
              <label htmlFor="slug">URL:</label>
              <input
                id="slug"
                type="text"
                placeholder="/URL"
                value={page.slug}
              />
            </div>
            <div className="pageMetaContentElem">
              <label htmlFor="author">Author:</label>
              <h2 id="author">{author}</h2>
            </div>
            <div className="checkBoxElem">
              <input id="showAuth" type="checkbox" value={page.showAuth} />
              <label htmlFor="showAuth">Show Author</label>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header className="publishModal" closeVariant="white">
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modalBodyElem" onChange={handleInputs}>
            <label htmlFor="publishDate">Publish Date:</label>
            <input id="publishDate" type="date" value={page.publishDate} />
          </div>
          <div className="modalBodyElem" onChange={handleInputs}>
            <label htmlFor="publishTime">Publish Time:</label>
            <input id="publishTime" type="time" value={page.publishTime} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="modalCloseBtn" onClick={handleClose}>
            Close
          </Button>
          <Button className="modalPublishBtn" onClick={publishPage}>
            Publish
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddPage;
