import React from "react";
import "./App.css";
import CreateSplit from "./components/CreateSplit";
import Split from "./components/Split.js";
import ListOfSplits from "./components/ListOfSplits.js";

function App() {
  return (
    <div className="App">
      <h1>Muffin Gains</h1>
      <ListOfSplits></ListOfSplits>
      <CreateSplit></CreateSplit>
    </div>
  );
}

export default App;
