import React, { Component } from 'react';

class ProfilePage extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="profile-page">
        <div className="filters">
        </div>
        <div className="heroes-table">
          <table className="table">
            <thead>
              <tr>
                <th>Hero</th>
                <th>Win Rate</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
      </div>
    )
  }

}

export default ProfilePage;
