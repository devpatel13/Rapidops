import "./App.css";
// import add from "build/cjs/RenderAdd";
import { add, sub } from "calculator";
// import myFun from "math/math";

function App() {
  return (
    <>
      <div className="App">{add(1, 7)}</div>;
      <div className="App">{sub(1, 7)}</div>
    </>
  );
}

export default App;
