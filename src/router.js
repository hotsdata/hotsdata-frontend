import React from 'react';
import { Router, Route, IndexRoute, browserHistory, hashHistory } from 'react-router';

import Container     from './components/Container';
import Home     from './components/Home';
import Register from './components/Register';
import SignIn   from './components/SignIn';
import Uploader from './components/uploader/Uploader';
import ReplaysIndexPage  from './containers/ReplaysIndexPage';
import ReplaysShowPage from './containers/ReplaysShowPage';

const Routes = () => {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={Container}>
        <IndexRoute component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/signin" component={SignIn} />
        <Route path="/upload" component={Uploader} />
        <Route path="/replays/:replayId" component={ReplaysShowPage} />
        <Route path="/replays" component={ReplaysIndexPage} />
      </Route>
    </Router>
  );
};

export default Routes;
