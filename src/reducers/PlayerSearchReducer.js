import {
  PLAYER_SEARCH_IN_PROGRESS,
  PLAYER_SEARCH_SUCCESS,
  PLAYER_SEARCH_FAILURE,
  PLAYER_SEARCH_CLEAR_RESULTS
} from '../actions/PlayerSearchActions';

const defaultState = {
  isLoading: false,
  error: null,
  results: []
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case PLAYER_SEARCH_IN_PROGRESS:
      return {...state, isLoading: action.isLoading};
    case PLAYER_SEARCH_SUCCESS:
      return {...state, results: action.results};
    case PLAYER_SEARCH_FAILURE:
      return {...state, error: action.error};
    case PLAYER_SEARCH_CLEAR_RESULTS:
      return {...state, results: []};
    default:
      return state;
  }
}
