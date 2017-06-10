import {
  SESSION_LOGIN_SUCCESS,
  SESSION_LOGIN_FAILED,
  SESSION_IS_LOGGING_IN,
  SESSION_LOGOUT
 } from '../actions/SessionActions';
import { REGISTER_USER } from '../actions/UserActions';
import Auth from '../lib/Auth';

const defaultState = {
  user: {},
  token: null,
  error: null,
  isLoading: false
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case REGISTER_USER:
      if (action.payload.data.token) {
        return {...state, user: action.payload.data.user};
      }

      return state;

    case SESSION_IS_LOGGING_IN:
      return {
        ...state,
        isLoading: action.isLoading
      };

    case SESSION_LOGIN_SUCCESS:
      let session = action.session;

      if (session.result) {
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
