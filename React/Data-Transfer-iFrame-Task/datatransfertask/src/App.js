import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import ParentComponent from "./components/ParentComponent";
import ChildComponent from "./components/ChildComponent";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <ParentComponent />
            <ChildComponent />
          </>
        }
      />
    </Routes>
  );
}

export default App;
