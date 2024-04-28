import "./App.css";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Input from "./components/Input/Input";
import Forecast from "./components/Forecast/Forecast";
import Error from "./components/Error/Error";

function App() {
  const [error, setError] = useState({
    status: 404,
    message: "Page Not Found",
  });
  const handleError = (errorObj) => {
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
