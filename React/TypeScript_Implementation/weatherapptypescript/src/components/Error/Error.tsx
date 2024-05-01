import React from "react";
import { ErrorState } from "../utils/type";

interface ErrorProps {
  error: ErrorState;
}

const Error: React.FC<ErrorProps> = ({ error }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>
        {error.status.toString()}: {error.message}
      </h1>
    </div>
  );
};

export default Error;
