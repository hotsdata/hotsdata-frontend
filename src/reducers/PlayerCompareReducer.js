import {
  ADD_PLAYER_COMPARE_IN_PROGRESS,
  ADD_PLAYER_COMPARE_SUCCESS,
  ADD_PLAYER_COMPARE_FAILURE
} from '../actions/PlayerCompareActions';

const defaultState = {
  playerIds: [],
  players: [],
  error: '',
  isLoading: false
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case ADD_PLAYER_COMPARE_IN_PROGRESS:
      let playerIds = state.playerIds;
      if (action.isLoading) {
        playerIds.push(action.playerId);
      }
      return {...state, isLoading: action.isLoading, playerIds: playerIds};
    case ADD_PLAYER_COMPARE_SUCCESS:
      return {...state, players: [...state.players, action.player]};
    case ADD_PLAYER_COMPARE_FAILURE:
      return {...state, error: action.error};
    default:
      return state;
  }
}
