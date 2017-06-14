import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { updateUser, changePassword } from '../actions/UserActions';
import './UserSettingsPage.scss';

class UserSettingsPage extends React.Component {
  constructor(props) {
    console.log('constructor');
    super(props);
    this.state = {
      user: {
        email: '',
        battletag: '',
        user_tz: '',
      },
      changePassword: {
        newPassword: '',
        repeatNewPassword: ''
      },
      message: this.props.message
    }

    this.onSettingsChange = this.onSettingsChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onSettingsSubmit = this.onSettingsSubmit.bind(this);
    this.onPasswordSubmit = this.onPasswordSubmit.bind(this);
  }

  componentWillMount() {
    let currentUser = {
      email: this.props.user.email || '',
      battletag: this.props.user.battletag || '',
      user_tz: '',
    };
    this.setState({user: currentUser});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.message == this.state.message) {
      this.setState({message: null});
    } else {
      this.setState({message: nextProps.message});
    }
  }

  render() {
    return (
      <div className="user-settings">
        <h1>User Settings</h1>
        <div className="message-container" style={{display: this.state.message ? 'inherit' : 'none'}}>
          {this.state.message}
        </div>

        <div className="user-settings-container">
          <div className="settings-component">
            <h2>Edit User</h2>
            <form onSubmit={this.onSettingsSubmit}>
              <label>Email</label>
              <input type="text" className="wide-field"
                onChange={this.onSettingsChange}
                name="email"
                value={this.state.user.email} />

              <label>Battletag</label>
              <input type="text" name="email"
                onChange={this.onSettingsChange}
                name="battletag"
                value={this.state.user.battletag} />

              {/* <label>Timezone</label>
               <select name="user_tz" defaultValue="0">
                 <option value="0">Select Timezone</option>
               </select>
              */}

              <p>
                <button className="btn"
                  style={{display: this.state.isLoading ? 'none' : 'inherit'}}>
                  Save settings
                </button>
              </p>
            </form>
          </div>


          <div className="settings-component">
            <h2>Change Password</h2>
            <form onSubmit={this.onPasswordSubmit}>
              <label>New Password</label>
              <input type="password" name="newPassword"
                onChange={this.onPasswordChange}
                value={this.state.changePassword.currentPassword} />

              <label>Repeat New Password</label>
              <input type="password" name="repeatNewPassword"
                onChange={this.onPasswordChange}
                value={this.state.changePassword.currentPassword} />

              <p>
                <button className="btn">Save new password</button>
              </p>
            </form>
          </div>
        </div>
      </div>
    )
  }

  onSettingsChange(e) {
    const field = e.target.name;
    const value = e.target.value;
    let user = this.state.user;
    user[field] = value;
    this.setState({user});
  }

  onSettingsSubmit(e) {
    e.preventDefault();
    this.props.updateUser(this.state.user);
  }

  onPasswordChange(e) {
    const field = e.target.name;
    const value = e.target.value;
    let changePassword = this.state.changePassword;
    changePassword[field] = value;
    this.setState({changePassword});
  }

  onPasswordSubmit(e) {
    e.preventDefault();
    this.props.changePassword(null, this.state.changePassword.newPassword);
  }

  validateConfirmPassword(e) {
    
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.currentUser,
    isLoading: state.user.isLoading,
    error: state.user.errors,
    message: state.user.message
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({updateUser, changePassword}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSettingsPage);
