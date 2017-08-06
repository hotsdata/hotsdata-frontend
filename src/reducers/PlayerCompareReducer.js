import {
  ADD_PLAYER_COMPARE_IN_PROGRESS,
  ADD_PLAYER_COMPARE_SUCCESS,
  ADD_PLAYER_COMPARE_FAILURE,
  REMOVE_PLAYER_COMPARE
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
    case REMOVE_PLAYER_COMPARE:
      let updatedPlayers = _.clone(state.players);
       _.remove(updatedPlayers, p => p.player_id == action.player_id);
      return {...state, players: updatedPlayers};
    default:
      return state;
  }
}
