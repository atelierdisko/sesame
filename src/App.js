import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./variables.css";
import "./typography.css";

import Index from "./pages/Index/Index";
import Reveal from "./pages/Reveal/Reveal";

const App = () => {
  return (
    <div className="app">
      <Router>
        <div className="util-container">
          <Switch>
            <Route path="/" exact={true}>
              <Index />
            </Route>

            <Route path="/reveal/:hash">
              <Reveal />
            </Route>

            <Redirect from="*" to="/" />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
