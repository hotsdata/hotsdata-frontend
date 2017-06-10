import {
  REGISTER_IN_PROGRESS,
  REGISTER_SUCCESS,
  REGISTER_FAILED
} from '../actions/UserActions';

import Auth from '../lib/Auth';

let defaultState = {
  currentUser: {},
  errors: []
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

    default:
      return state;
  }
}
