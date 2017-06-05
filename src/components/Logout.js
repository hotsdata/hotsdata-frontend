import React from 'react';

import Auth from '../lib/Auth';
import { logoutUser } from '../actions/session_actions';

class Logout extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    logoutUser();
  }

  componentWillReceiveProps(nextProps) {
    if (Auth.isUserAuthenticated() == false) {
      this.props.router.push({pathname: '/signin'});
    } else {
      this.props.router.push({pathname: '/replays'});
    }
  }

  render() {
    return null;
  }
}

export default Logout;
