import "react-quill/dist/quill.snow.css";
import ReactQuill, { Quill } from "react-quill";
import { useState } from "react";

const TextEditor = () => {
  const [bodyContent, setBodyContent] = useState();
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

  return (
    <ReactQuill
      theme="snow"
      modules={modules}
      formats={formats}
      value={bodyContent}
      onChange={setBodyContent}
    ></ReactQuill>
  );
};

export default TextEditor;
