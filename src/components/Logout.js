import React from 'react';

import { logoutUser } from '../actions/session_actions';

class Logout extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    logoutUser();
    this.props.router.push({pathname: '/signin'});
  }

  render() {
    return null;
  }
}

export default Logout;
