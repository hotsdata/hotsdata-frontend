import {
  ADD_PLAYER_COMPARE_IN_PROGRESS,
  ADD_PLAYER_COMPARE_SUCCESS,
  ADD_PLAYER_COMPARE_FAILURE
} from '../actions/PlayerCompareActions';

const defaultState = {
  toonhandles: [],
  players: [],
  error: '',
  isLoading: false
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case ADD_PLAYER_COMPARE_IN_PROGRESS:
      let toonhandles = state.toonhandles;
      if (action.isLoading) {
        toonhandles.push(action.playerId);
      }
      return {...state, isLoading: action.isLoading, toonhandles: toonhandles};
    case ADD_PLAYER_COMPARE_SUCCESS:
      return {...state, players: [...state.players, action.player]};
    case ADD_PLAYER_COMPARE_FAILURE:
      return {...state, error: action.error};
    default:
      return state;
  }
}
