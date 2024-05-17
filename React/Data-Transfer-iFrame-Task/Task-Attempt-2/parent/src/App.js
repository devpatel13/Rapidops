import "./App.css";
import { srcDocStr } from "./utils/srcDocStr";

function App() {
  return (
    <div className="App">
      <iframe
        srcDoc={srcDocStr}
        title="child"
        frameBorder="0"
        id="child"
      ></iframe>
    </div>
  );
}

export default App;
