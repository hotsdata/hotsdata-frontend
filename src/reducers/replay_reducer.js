import {
  FETCH_REPLAYS,
  FETCH_CURRENT_REPLAY_STATS
} from '../actions/replay_actions';

import MatchSummaryDataTransformer from '../lib/MatchSummaryDataTransformer';

const defaultState = {
  allReplays: [],
  pages: {},
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
      console.log(action.payload);
      return {...state, allReplays: action.payload.data.data, pages: action.payload.data.pages }
    case FETCH_CURRENT_REPLAY_STATS:
      let replay = action.payload.data[0];
      return {...state, currentReplay: replay};
    default:
      return state;
  }

}
