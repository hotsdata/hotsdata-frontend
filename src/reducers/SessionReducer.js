import {
  SESSION_GET_USER_INFO,
  SESSION_LOGIN_SUCCESS,
  SESSION_LOGIN_FAILED,
  SESSION_IS_LOGGING_IN,
  SESSION_LOGOUT
 } from '../actions/SessionActions';
import { REGISTER_SUCCESS } from '../actions/UserActions';
import Auth from '../lib/Auth';

const defaultState = {
  token: null,
  error: null,
  isLoading: false,
  user: null
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case SESSION_GET_USER_INFO:
      let user = action.payload.data;
      user.name = user.battletag.split('#')[0];
      return {...state, user: user};
    case REGISTER_SUCCESS:
      if (action.session.token) {
        return {
          ...state,
          token: action.session.token
        };
      }

      return state;

    case SESSION_IS_LOGGING_IN:
      return {
        ...state,
        isLoading: action.isLoading
      };

    case SESSION_LOGIN_SUCCESS:
      let session = action.session;
      if (session.token) {
        Auth.authenticateUser(session.token);

        return {
          ...state,
          token: session.token
        };
      }

      return state;

    case SESSION_LOGIN_FAILED:
      return {
        ...state,
        error: action.error
      };

    case SESSION_LOGOUT:
      Auth.deauthenticateUser();
      return defaultState;

    default:
      return state;
  }
}
