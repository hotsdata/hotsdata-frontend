import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, browserHistory } from 'react-router';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';

import Auth from '../lib/Auth';
import { logOutUser } from '../actions/session_actions';

class ProfileDropdown extends Component {
  constructor(props) {
    super(props)

    this.handleLinkClick = this.handleLinkClick.bind(this);
  }

  handleLinkClick() {
    this.refs.dropdown.hide();
  }

  componentWillReceiveProps() {
    this.forceUpdate();
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
                <a href="#" onClick={this.handleLinkClick}>
                  <i className="fa fa-cog" />
                  Settings
                </a>
                <Link to="/logout" onClick={this.handleLinkClick}>
                  <i className="fa fa-sign-out" />
                  Logout
                </Link>
              </div>
            }
            {Auth.isUserAuthenticated() == false &&
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
  return bindActionCreators({logOutUser}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDropdown);
