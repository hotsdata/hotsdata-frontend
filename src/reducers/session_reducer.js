import { SESSION_LOGIN, SESSION_LOGOUT } from '../actions/session_actions';
import Auth from '../lib/Auth';
import { push } from 'react-router-redux';

const defaultState = {
  errors: [],
  token: null
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case SESSION_LOGIN:
      let newState = null;
      let data = action.payload.data;
      if (data.msg && data.msg === 'Error - Could not login with the provided credentials') {
        let errors = state.errors;
        console.log('errors', errors);
        errors.push({msg: data.msg});
        newState = {...state, errors: errors}
      } else {
        console.log(action.payload.data);
        let token = action.payload.data.token;
        Auth.authenticateUser(token);
        newState = {...state, token: token, errors: []};
      }

      return newState;
    case SESSION_LOGOUT:
      Auth.deauthenticateUser();
      return {}
    default:
      return state;
  }
}
