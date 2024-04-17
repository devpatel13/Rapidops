import { useEffect, useState } from "react";
import "./App.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import Clock from "./exercise/exercise1/Clock";
import Input from "./exercise/exercise2/Input";
import TableComponenet from "./exercise/exercise2/Table";
// import Stack from "react-bootstrap/Stack";
// import { Container } from "react-bootstrap";
import SingleCompApproach from "./exercise/exercise2/SingleCompApproach";

function App() {
  const [fullName, setFullName] = useState([]);

  useEffect(() => {
    console.log(fullName);
  }, [fullName]);

  const addName = (data) => {
    setFullName(data);
  };
  return (
    // <div classNameName="div-wrapper">
    //   <Clock />
    // </div>
    // <Container>
    //   <Stack direction="vertical" gap={3}>
    //     <div classNameName="p-2">
    //       <Input />
    //     </div>
    //     <div classNameName="p-2">
    //       <TableComponenet />
    //     </div>
    //   </Stack>
    // </Container>

    // single component approach
    <SingleCompApproach />

    // multiple component approach
    // <div className="d-flex flex-column min-vh-100 min-vw-100">
    //   <div className="d-flex flex-grow-1 justify-content-center align-items-center flex-column gap-5">
    //     <Input sendInput={addName} />
    //     <TableComponenet fullName={fullName} />
    //   </div>
    // </div>
  );
}

export default App;
