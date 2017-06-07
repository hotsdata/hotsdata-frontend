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
      if (data.token) {
        Auth.authenticateUser(data.token);
        return {...state, currentUser: data.user};
      } else {
        return {...state, errors: [data.msg]};
      }
      return state;
    default:
      return state;
  }
}
