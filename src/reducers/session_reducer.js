import {
  SESSION_LOGIN,
  SESSION_LOGIN_SUCCESS,
  SESSION_LOGIN_FAILURE,
  SESSION_LOGOUT,
 } from '../actions/session_actions';
import { REGISTER_USER } from '../actions/user_actions';
import Auth from '../lib/Auth';

const defaultState = {
  user: {},
  token: null,
  errors: [],
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case REGISTER_USER:
      console.log('caught REGISTER_USER!', action.payload);
      if (action.payload.data.result) {
        return {...state, user: {battletag: "Marod#1111"}};
      }
      return state;
    case SESSION_LOGIN:
      let newState = null;
      let data = action.payload.data;
      console.log('data', data);
      if (data.result) {
        Auth.authenticateUser(data.token);
        newState = {...state, token: data.token, errors: []};
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
