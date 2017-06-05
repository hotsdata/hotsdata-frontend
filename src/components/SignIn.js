import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Auth from '../lib/Auth';
import { logInUser } from '../actions/session_actions';

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      credentials: {
        email: '',
        password: ''
      }
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    let field = event.target.name;
    let credentials = this.state.credentials;
    credentials[field] = event.target.value;
    this.setState({credentials});
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.logInUser(this.state.credentials);
  }

  componentWillReceiveProps(nextProps) {
    if (Auth.isUserAuthenticated()) {
      this.props.router.push({pathname: '/replays'});
    }
  }

  render() {
    return (
      <div className="container">
        <h2>Sign In</h2>
        { this.props.session.errors.length > 0 &&
          <div className="errors">
            <i className="fa fa-exclamation-triangle" aria-hidden="true" />
            {this.props.session.errors.map(err => {
                return(<span key={err.msg}>{err.msg}</span>)
              })
            }
          </div>
        }
        <div>
          <form onSubmit={this.onSubmit}>
            <label>Email</label>
            <input type="text"
              name="email"
              onChange={this.onChange}
              value={this.state.credentials.email} />
            <label>Password</label>
            <input type="password"
              name="password"
              onChange={this.onChange}
              value={this.state.credentials.password} />
            <br />
            <button className="btn" type='submit'>Sign In</button>
          </form>
        </div>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    session: state.session
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({logInUser}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
