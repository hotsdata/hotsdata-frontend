import {
  FETCH_REPLAYS,
  FETCH_CURRENT_REPLAY_STATS
} from '../actions/replay_actions';

import MatchSummaryDataTransformer from '../lib/MatchSummaryDataTransformer';

const defaultState = {
  allReplays: [],
  currentReplay: {
    stats: [

    ],
    talents: [

    ],
    performance: [

    ]
  }
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case FETCH_REPLAYS:
      return {...state, allReplays: action.payload.data.data }
    case FETCH_CURRENT_REPLAY_STATS:
      let replay = action.payload.data[0];
      console.log(replay);
      return {...state, currentReplay: replay};
    default:
      return state;
  }

}
