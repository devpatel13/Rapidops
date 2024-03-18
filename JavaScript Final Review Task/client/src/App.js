import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import AddPage from "./components/AddPage";
import AllPages from "./components/AllPages";
import Sidebar from "./components/Sidebar";

function App({ location }) {
  // const location = useLocation();
  const hideSidebar =
    location.pathname === "/login" || location.pathname === "/signup";

  // console.log(hideSidebar);

  return (
    <>
      <Router>
        <Routes>
          {!hideSidebar && <Sidebar />}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignIn />} />
          <Route path="/addpage" element={<AddPage />} />
          <Route path="/allpages" element={<AllPages />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
