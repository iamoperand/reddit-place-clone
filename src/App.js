import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import routes from './config/routes';

import Home from './components/Home';
import NotFound from './components/NotFound';
import Playground from './components/Playground';


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path={routes.Home} component={Home} />
          <Route exact path={routes.Playground} component={Playground} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
