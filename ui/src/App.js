import React from "react";
import "./App.css";
import CreateSplit from "./components/CreateSplit";
import Split from "./components/Split.js";
import ListOfSplits from "./components/ListOfSplits.js";
import Header from "./components/Header.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Header></Header>

        <Switch>
          <Route exact path="/" component={ListOfSplits}>
            <ListOfSplits></ListOfSplits>
            <CreateSplit></CreateSplit>
          </Route>
          <Route path="/split/:split_id" component={Split}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
