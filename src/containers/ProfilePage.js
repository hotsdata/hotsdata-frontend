import React, { Component } from 'react';

class ProfilePage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      accountId: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.setAccount = this.setAccount.bind(this);
  }

  componentWillMount() {
    let storedAccountId = localStorage.getItem('accountId');
    if (storedAccountId) {
      this.setState({...this.state, accountId: storedAccountId});
    }
  }

  handleChange(e) {
    this.setState({...this.state, accountId: e.target.value});
  }

  setAccount() {
    localStorage.setItem('accountId', this.state.accountId);
  }

  render() {
    return (
      <div>
        <h3>
          Profile page is coming soon!  We plan on it being a dashboard with your hot and cold heroes, metric tracking, and various other trends.
        </h3>
      </div>
    )
  }

}

export default ProfilePage;
