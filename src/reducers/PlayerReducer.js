import {
  FETCH_PLAYER_HERO_STATS_IN_PROGRESS,
  FETCH_PLAYER_HERO_STATS_SUCCESS,
  FETCH_PLAYER_HERO_STATS_FAILURE
} from '../actions/PlayerActions';

let defaultState = {
  isLoading: false,
  error: null,
  heroStats: null
}

export default function(state = defaultState, action) {
  switch(action.type) {
    case FETCH_PLAYER_HERO_STATS_IN_PROGRESS:
      return {...state, isLoading: action.isLoading};
    case FETCH_PLAYER_HERO_STATS_SUCCESS:
      return {...state, heroStats: action.heroStats};
    case FETCH_PLAYER_HERO_STATS_FAILURE:
      return {...state, error: action.error};
    default:
      return state;
  }
}
