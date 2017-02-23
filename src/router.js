import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Home from './components/Home';

const Routes = () => {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={Home} />
    </Router>
  );
};

export default Routes;
