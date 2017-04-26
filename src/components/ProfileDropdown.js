import React, { Component } from 'react';
import { Link } from 'react-router';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';

class ProfileDropdown extends Component {
  constructor(props) {
    super(props)

    this.handleLinkClick = this.handleLinkClick.bind(this);
  }

  handleLinkClick() {
    this.refs.dropdown.hide();
  }

  render() {
    return(
      <Dropdown className="profile-dropdown" ref="dropdown">
        <DropdownTrigger>
          <span className="dropdown-trigger-text">
            My Account
            <i className="fa fa-caret-down" />
          </span>
        </DropdownTrigger>
        <DropdownContent>
          <div className="link-list-wrapper">
            <Link to="/signin">
              <i className="fa fa-sign-in" />
              Log In
            </Link>
            <Link to="/register">
              <i className="fa fa-user-plus" />
              Register
            </Link>
            <a href="#" onClick={this.handleLinkClick}>
              <i className="fa fa-user" />
              Profile
            </a>
            <a href="#" onClick={this.handleLinkClick}>
              <i className="fa fa-cog" />
              Settings
            </a>
            <a href="#" onClick={this.handleLinkClick}>
              <i className="fa fa-sign-out" />
              Logout
            </a>
          </div>
        </DropdownContent>
      </Dropdown>
    )
  }
}

export default ProfileDropdown;
