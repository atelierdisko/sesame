import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "focus-visible/dist/focus-visible.min.js";
import Index from "./pages/Index/Index";
import Reveal from "./pages/Reveal/Reveal";
import NoMatch from "./pages/NoMatch";

const App = () => {
  return (
    <div className="app">
      <Router>
        <div className="container">
          <Switch>
            <Route path="/" exact={true}>
              <Index />
            </Route>

            <Route path="/reveal/:hash">
              <Reveal />
            </Route>

            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
