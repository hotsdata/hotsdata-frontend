import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { updateUser, changePassword } from '../actions/user_actions';
import './SettingsPage.scss';

class SettingsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: this.props.email,
        battletag: this.props.battletag
      },
      changePassword: {
        password: '',
        confirmPassword: ''
      }
    }

    console.log('state', this.state);
  }

  onUserChange(e) {

  }

  onPasswordChange(e) {

  }

  onEditUserSubmit() {

  }

  onChangePasswordSubmit() {

  }

  render() {
    return (
      <div>
        <h1>Edit your settings</h1>
        <div className="user-forms">
          <div className="edit-user-form">
            <h2 className="orange">Edit User</h2>
            <form>
              <label>Email</label>
              <input type="text"
                className="wide-field"
                name="email"
                onChange={this.onUserChange}
                value={this.state.user.email} />
              <label>Battletag</label>
              <input type="text"
                className="wide-field"
                name="battletag"
                onChange={this.onUserChange}
                value={this.state.user.battletag} />
              <br />
              <button className="btn" type='submit'>Update</button>
            </form>
          </div>
          <div className="change-password-form">
            <h2 className="orange">Change Password</h2>
            <form>
              <label>Password</label>
              <input type="password"
                className="wide-field"
                name="password"
                onChange={this.onPasswordChange}
                value={this.state.changePassword.password} />
              <label>Confirm Password</label>
              <input type="password"
                className="wide-field"
                name="confirm_password"
                onChange={this.onPasswordChange}
                value={this.state.changePassword.confirmPassword} />
              <br />
              <button className="btn" type="submit">Change</button>
            </form>
          </div>
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    user: state.session.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({updateUser, changePassword}, dispatch)
}

export default connect(mapStateToProps)(SettingsPage);
