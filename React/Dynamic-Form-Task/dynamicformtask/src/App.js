import { Route, Routes } from "react-router-dom";
import "./App.css";
import DynamicForm from "./components/DynamicForm/DynamicForm";
import Home from "./components/Home/Home";
import SubmitForm from "./components/SubmitForm/SubmitForm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="submitform" element={<SubmitForm />} />
      </Routes>
    </>
  );
}

export default App;
