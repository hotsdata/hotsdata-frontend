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
      console.log(data);
      // if success
      if (data.result) {
        Auth.authenticateUser(data.token);
        return {...state, currentUser: {battletag: "Marod#1111"}};
      } else {
        return {...state, errors: [data.msg]};
      }
      return state;
    default:
      return state;
  }
}
