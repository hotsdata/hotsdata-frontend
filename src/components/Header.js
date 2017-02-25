import React, { Component } from 'react';
import { Link } from 'react-router';
import { Menu } from 'semantic-ui-react';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  render() {
    return (
      <Menu>
        <Menu.Item name='brand'>
          <Link to="/">Kerrigan</Link>
        </Menu.Item>
        <Menu.Item name='signin'>
          <Link to="/signin">Log In</Link>
        </Menu.Item>
        <Menu.Item name='register'>
          <Link to="/register">Register</Link>
        </Menu.Item>
      </Menu>
    );
  }
};

export default Header;
