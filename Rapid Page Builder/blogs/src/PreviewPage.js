import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const PreviewPage = () => {
  const { slug } = useParams();
  const [pageData, setPageData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const response = fetch(`/blogpage/${slug}`, {
      method: "GET",
    })
      .then((res) => {
        console.log(res);
        if (res.status === 404)
          setPageData({
            title: "Error",
            subTitle: "Page Not Found",
            bodyContent: "",
          });
        else if (res.status === 200) return res.json();
      })
      .then((data) => {
        // console.log(data.title);
        setPageData({
          title: data.page.title,
          subTitle: data.page.subTitle,
          bodyContent: data.page.bodyContent,
        });
      });
    // console.log(response);
  }, []);

  return (
    <>
      <div className="previewDiv">
        <div id="previewTitle">{pageData.title}</div>
        <div id="previewSubTitle">{pageData.subTitle}</div>
        <div
          dangerouslySetInnerHTML={{ __html: pageData.bodyContent }}
          id="previewBodyContent"
        />
      </div>
      {/* {previewContent()} */}
    </>
  );
};

export default PreviewPage;
