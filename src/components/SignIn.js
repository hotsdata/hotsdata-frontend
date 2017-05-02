import React from 'react';

class SignIn extends React.Component {

  render() {
    return (
      <div className="container">
        <h2>Sign In</h2>
        <div>
          <form>
            <label>Email</label>
            <input type="text" name="email" />
            <label>Password</label>
            <input type="password" name="password" />
          </form>
          <button type='submit'>Sign In</button>
        </div>
      </div>
    );
  }

}

export default SignIn;
