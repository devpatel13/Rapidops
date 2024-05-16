import React, { useEffect } from "react";
import eventBus from "../../utils/eventBus";

export default function Footer() {
  console.log("rendered");
  useEffect(() => {
    eventBus.subscribe((event) => {
      if (event.type === "TEXT_COPIEDD") console.log("run");
    });
  }, []);
  return <div>Footer</div>;
}
