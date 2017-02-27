import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Home     from './components/Home';
import Register from './components/Register';
import SignIn   from './components/SignIn';
import Uploader from './components/Uploader';

const Routes = () => {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={Home}>
        <Route path="/register" component={Register} />
        <Route path="/signin" component={SignIn} />
        <Route path="/upload" component={Uploader} />
      </Route>
    </Router>
  );
};

export default Routes;
