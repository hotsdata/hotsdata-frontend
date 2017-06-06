import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { registerUser } from '../actions/user_actions';
import Auth from '../lib/Auth';

class Register extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {
        email: 'jaysonw.bailey+1@gmail.com',
        password: 'm1chigan',
        battletag: 'Marod#1111'
      }
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (Auth.isUserAuthenticated()) {
      this.props.router.push({pathname: '/replays'});
    }
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
      <div className="container">
        <h2>Register</h2>
        { this.props.user.errors.length > 0 &&
          <div className="errors">
            <i className="fa fa-exclamation-triangle" aria-hidden="true" />
            {this.props.user.errors.map((err, i) => {
                return(<span key={i}>{err}</span>)
              })
            }
          </div>
        }
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
            value={this.state.user.password} />
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

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({registerUser}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
