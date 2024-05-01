import "./App.css";
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Input from "./components/Input/Input";
import Forecast from "./components/Forecast/Forecast";
import Error from "./components/Error/Error";
import { ErrorState } from "./components/utils/type";

function App() {
  const [error, setError] = useState<ErrorState>({
    status: 404,
    message: "Page Not Found",
  });
  const handleError = (errorObj: ErrorState): void => {
    setError(errorObj);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Input />} />
        <Route
          path={"forecast/:city"}
          element={<Forecast handleError={handleError} />}
        />
        <Route path="*" element={<Error error={error} />} />
      </Routes>
    </>
  );
}

export default App;
