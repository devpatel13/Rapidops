import React from "react";

export default function Error({ error }) {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>
        {error.status}: {error.message}
      </h1>
    </div>
  );
}
