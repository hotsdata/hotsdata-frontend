import { SESSION_LOGIN, SESSION_LOGOUT } from '../actions/session_actions';
import Auth from '../lib/Auth';
import { push } from 'react-router-redux';

export default function(state = null, action) {
  switch (action.type) {
    case SESSION_LOGIN:
      let token = action.payload.data.token;
      Auth.authenticateUser(token);
      return {...state, token: token};
    case SESSION_LOGOUT:
      Auth.deauthenticateUser();
      return {}
    default:
      return state;
  }
}
