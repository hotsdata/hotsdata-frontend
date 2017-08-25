import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, browserHistory } from 'react-router';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';

import Auth from '../lib/Auth';
import { getUserInfo, logoutUser } from '../actions/SessionActions';

class ProfileDropdown extends Component {
  constructor(props) {
    super(props)

    this.handleLinkClick = this.handleLinkClick.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

  }

  componentWillMount() {
    if (Auth.isUserAuthenticated() && this.props.session.user == null) {
      this.props.getUserInfo();
    }
  }

  handleLinkClick() {
    this.refs.dropdown.hide();
  }

  handleLogout() {
    this.props.logoutUser();
    this.handleLinkClick();
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
            {Auth.isUserAuthenticated() &&
              <div className="link-list-wrapper">
                <Link to="/profile" onClick={this.handleLinkClick}>
                  <i className="fa fa-user" />
                  Profile
                </Link>
                <Link to="/profile/heroes" onClick={this.handleLinkClick}>
                  <i className="fa fa-users" />
                  Heroes
                </Link>
                <Link to="/user-settings" onClick={this.handleLinkClick}>
                  <i className="fa fa-cog" />
                  Settings
                </Link>
                <a href="#" onClick={this.handleLogout}>
                  <i className="fa fa-cog" />
                  Logout
                </a>
              </div>
            }
            {!Auth.isUserAuthenticated() &&
              <div className="link-list-wrapper">
                <Link to="/signin" onClick={this.handleLinkClick}>
                  <i className="fa fa-sign-in" />
                  Log In
                </Link>
                <Link to="/register" onClick={this.handleLinkClick}>
                  <i className="fa fa-user-plus" />
                  Register
                </Link>
              </div>
            }
        </DropdownContent>
      </Dropdown>
    )
  }
}

function mapStateToProps(state) {
  return {
    session: state.session
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({getUserInfo, logoutUser}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDropdown);
