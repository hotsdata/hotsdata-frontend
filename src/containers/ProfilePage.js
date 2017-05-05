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
        <form>
          <label htmlFor="account">Account (Ex. 1-Hero-1-775282)</label>
          <input type="text" name="account"
             value={this.state.accountId} onChange={this.handleChange} />
          <button className="btn" onClick={this.setAccount}>Set</button>
        </form>
      </div>
    )
  }

}

export default ProfilePage;
