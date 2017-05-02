import React from 'react';

class Register extends React.Component {

  render() {
    return (
      <div className="container">
        <h2>Register</h2>
        <form>
          <label>Email</label>
          <input type="text" />
          <label>Password</label>
          <input type="password" />
          <input type="checkbox"  />
          <label>I agree to the Terms and Conditions</label>
          <button className="btn" type='submit' onClick={this.handleRegister}>Register</button>
        </form>
      </div>
    );
  }

  handleRegister() {
    console.log('handle this shit');
  }

}

export default Register;
