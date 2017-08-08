import {
  FETCH_FRIENDS_IN_PROGRESS,
  FETCH_FRIENDS_SUCCESS,
  FETCH_FRIENDS_FAILURE
} from '../actions/FriendActions';

let defaultState = {
  isLoading: false,
  error: null,
  friends: []
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case FETCH_FRIENDS_IN_PROGRESS:
      return {...state, isLoading: action.isLoading};
    case FETCH_FRIENDS_SUCCESS:
      return {...state, friends: action.friends};
    case FETCH_FRIENDS_FAILURE:
      return {...state, error: action.error};
    default:
      return state;
  }
}
