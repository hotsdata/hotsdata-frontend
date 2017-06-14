import {
  REGISTER_IN_PROGRESS,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  UPDATE_USER_IN_PROGRESS,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_PASSWORD
} from '../actions/UserActions';
import { SESSION_LOGIN_SUCCESS } from '../actions/SessionActions';

import Auth from '../lib/Auth';

let defaultState = {
  currentUser: {},
  errors: [],
  message: null,
  isLoading: false
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case REGISTER_IN_PROGRESS:
      return {
        ...state,
        isLoading: action.isLoading
      };

    case REGISTER_SUCCESS:
      if (action.session.token) {
        // Log user in on success
        Auth.authenticateUser(action.session.token);
        return {...state, currentUser: action.session.user};
      }

      return state;

    case REGISTER_FAILED:
      return {
        ...state,
        error: action.error
      };

    case SESSION_LOGIN_SUCCESS:
      return {
        ...state,
        currentUser: action.user
      }

    case UPDATE_USER_IN_PROGRESS:
      return {...state, isLoading: action.isLoading }

    case UPDATE_USER_SUCCESS:
      return {...state, currentUser: action.user, message: "User updated successfully" };

    case UPDATE_USER_FAILURE:
      return {...state, errors: [action.data.msg] };

    case UPDATE_PASSWORD:
      if (action.payload.data.result) {
        return {...state, message: 'Password updated successfully'};
      } else {
        return {...state, errors: [action.payload.data.msg]};
      }
      return state;

    default:
      return state;
  }
}
