import React from 'react';

import './UserSettingsPage.scss';

class UserSettingsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTimeZone: '',
      changePassword: {
        currentPassword: '',
        newPassword: '',
        repeatNewPassword: ''
      }
    }

    this.onPasswordSubmit = this.onPasswordSubmit.bind(this);
    this.onSettingsSubmit = this.onSettingsSubmit.bind(this);
  }

  render() {
    return (
      <div className="user-settings-component">
        <h1>User Settings (WIP)</h1>
        <p>Nothing works here yet.</p>

        <h2>Time zone</h2>
        <div>
          <form onSubmit={this.onSettingsSubmit}>
            <select name="timezone" defaultValue="0">
              <option value="0">Select Timezone</option>
            </select>

            <p>
              <button className="btn">Save settings</button>
            </p>
          </form>
        </div>

        <h2>Change Password</h2>
        <div>
          <form onSubmit={this.onPasswordSubmit}>
            <label>Current Password</label>
            <input type="text" name="email" value={this.state.changePassword.currentPassword} />

            <label>New Password</label>
            <input type="text" name="email" value={this.state.changePassword.currentPassword} />

            <label>Repeat New Password</label>
            <input type="text" name="email" value={this.state.changePassword.currentPassword} />

            <p>
              <button className="btn">Save new password</button>
            </p>
          </form>
        </div>
      </div>
    )
  }

  onSettingsSubmit() {
    
  }

  onPasswordSubmit() {

  }
}

export default UserSettingsPage;
