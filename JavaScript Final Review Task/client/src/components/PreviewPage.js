import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PreviewPage = () => {
  //   const location = useLocation();
  //   const navigate = useNavigate();
  const storedData = localStorage.getItem("blogData");
  const { title, subtitle, bodyContent } = storedData
    ? JSON.parse(storedData)
    : {};
  //   if (!location.state.isPreviewable) {
  //     alert("Cannot be previewed");
  //     navigate("/allpages");
  //   }

  const [page, setPage] = useState({ title, subtitle, bodyContent });

  const goToEditPage = () => {
    // navigate("/");
  };

  return (
    <>
      <button type="button" id="backButton" onClick={goToEditPage}>
        Back
      </button>
      <div className="previewDiv">
        <div id="previewTitle">{page.title}</div>
        <div id="previewSubTitle">{page.subTitle}</div>
        <div
          dangerouslySetInnerHTML={{ __html: page.bodyContent }}
          id="previewBodyContent"
        />
      </div>
      {/* {previewContent()} */}
    </>
  );
};

export default PreviewPage;
