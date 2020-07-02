import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Create from "./pages/Create";
import Reveal from "./pages/Reveal";
import NoMatch from "./pages/NoMatch";

const App = () => {

  return (
    <div className="app">
      <Router>
        <div>
          <Switch>
            <Route path="/" exact={true}>
              <Create/>
            </Route>

            <Route path="/reveal/:token">
              <Reveal/>
            </Route>

            <Route path="*">
              <NoMatch/>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
