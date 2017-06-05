import { REGISTER_USER } from '../actions/user_actions';

import Auth from '../lib/Auth';

let defaultState = {
  currentUser: {},
  errors: []
}

export default function (state = defaultState, action) {
  switch (action.type) {
    case REGISTER_USER:
      let data = action.payload.data;
      // if success
        // set token
        // return user data
      // if failure
        // return errors

    default:
      return state;
  }
}
