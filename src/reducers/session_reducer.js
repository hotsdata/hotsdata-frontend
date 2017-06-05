import { SESSION_LOGIN, SESSION_LOGOUT } from '../actions/session_actions';
import Auth from '../lib/Auth';

const defaultState = {
  errors: [],
  token: null
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case SESSION_LOGIN:
      let newState = null;
      let data = action.payload.data;
      if (data.token) {
        let token = action.payload.data.token;
        Auth.authenticateUser(token);
        newState = {...state, token: token, errors: []};
      } else {
        let errors = [];
        errors.push({msg: data.msg});
        newState = {...state, errors: errors}
      }

      return newState;
    case SESSION_LOGOUT:
      Auth.deauthenticateUser();
      return defaultState;
    default:
      return state;
  }
}
