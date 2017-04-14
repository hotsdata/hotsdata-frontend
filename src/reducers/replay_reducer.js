import {
  FETCH_REPLAYS,
  FETCH_CURRENT_REPLAY_GENERAL_STATS
} from '../actions/replay_actions';

const defaultState = {
  allReplays: [{ "mapname": "ABC", "replayid": "k3ikdjfdk" }],
  currentReplay: {
    general_stats: []
  }
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case FETCH_REPLAYS:
      return {...state, allReplays: action.payload.data }
    case FETCH_CURRENT_REPLAY_GENERAL_STATS:
      return {...state, currentReplay: {...state.currentReplay, general_stats: action.payload.data}}
    default:
      return state;
  }

}
