import {
  FETCH_HEROES_IN_PROGRESS,
  FETCH_HEROES_SUCCESS,
  FETCH_HEROES_FAILURE
} from '../actions/HeroActions';

let defaultState = {
  isLoading: false,
  error: null,
  allHeroes: []
}

export default function(state = defaultState, action) {
  switch(action.type) {
    case FETCH_HEROES_IN_PROGRESS:
      return {...state, isLoading: action.isLoading};
    case FETCH_HEROES_SUCCESS:
      return {...state, allHeroes: action.heroes};
    case FETCH_HEROES_FAILURE:
      return {...state, error: action.error};
    default:
      return state;
  }
}
