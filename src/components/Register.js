import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { registerUser } from '../actions/UserActions';
import Auth from '../lib/Auth';

import './SignIn.scss';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: '',
        password: '',
        battletag: ''
      }
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.renderError = this.renderError.bind(this);
  }

  componentWillReceiveProps() {
    if (Auth.isUserAuthenticated()) {
      this.props.router.push({pathname: '/replays'});
    }
  }

  componentDidMount(){
    this.mailInput.focus();
  }

  onChange(event) {
    let field = event.target.name;
    let user = this.state.user;
    user[field] = event.target.value;
    this.setState({user});
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.registerUser(this.state.user);
  }

  render() {
    return (
      <div className="sign-in-component">
        <h2>Register</h2>
        { this.renderError() }
        <form onSubmit={this.onSubmit}>
          <label>Email</label>
          <input type="text"
            name="email"
            ref={(input) => { this.mailInput = input; }}
            onChange={this.onChange}
            disabled={this.props.isLoading}
            value={this.state.user.email} />
          <label>Password</label>
          <input type="password"
            name="password"
            onChange={this.onChange}
            disabled={this.props.isLoading}
            value={this.state.user.password} />
          <label>Battletag</label>
          <input type="text"
            name="battletag"
            onChange={this.onChange}
            disabled={this.props.isLoading}
            value={this.state.user.battletag} />
          <br />
          <button className="btn login-btn" type='submit'>{ this.props.isLoading ? 'Loading...' : 'Register' }</button>
        </form>
        <p>Already have a user? <Link to="/signin">Login here</Link></p>
      </div>
    );
  }

  renderError() {
    if (this.props.error) {
      return (
        <div className="errors">
          <i className="fa fa-exclamation-triangle" aria-hidden="true" />
          <span>{this.props.error}</span>
        </div>
      )
    }

    return null;
  }

}

function mapStateToProps(state) {
  return {
    user: state.user,
    isLoading: state.user.isLoading,
    error: state.user.error
  }
}

function mapDispatchToProps(dispatch) {
  return {
    registerUser: (credentials) => dispatch(registerUser(credentials))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
