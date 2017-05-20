import React from 'react';
import axios from 'axios';

class Register extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      errors: [],
      user: {
        email: '',
        password: '',
        battletag: ''
      }
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    let field = event.target.name;
    let user = this.state.user;
    user[field] = event.target.value;
    this.setState({user});
  }

  onSubmit(event) {
    event.preventDefault();
    console.log('user', this.state.user);
    axios.post("http://api.hotsdata.com/register", this.state.user)
    .then((response) => {
      console.log('success', response);
    })
    .catch((error) => {
      console.log('error', error);
    })
  }

  render() {
    return (
      <div className="container">
        <h2>Register</h2>
        <form onSubmit={this.onSubmit}>
          <label>Email</label>
          <input type="text"
            name="email"
            onChange={this.onChange}
            value={this.state.user.email} />
          <label>Password</label>
          <input type="password"
            name="password"
            onChange={this.onChange}
            value={this.state.user.pass} />
          <label>Battletag</label>
          <input type="text"
            name="battletag"
            onChange={this.onChange}
            value={this.state.user.battletag} />
          <br />
          <button className="btn" type='submit'>Register</button>
        </form>
      </div>
    );
  }

}

export default Register;
