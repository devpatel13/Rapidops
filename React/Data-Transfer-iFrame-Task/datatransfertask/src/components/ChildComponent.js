import React, { useEffect } from "react";
// import childScript from "build1/static/js/main.80074925";

export default function ChildComponent() {
  console.log("1");

  console.log("2");
  return (
    <div
      id="child-root"
      onLoad={import("build1/static/js/main.a9da4bc7")}
    ></div>
  );
}
