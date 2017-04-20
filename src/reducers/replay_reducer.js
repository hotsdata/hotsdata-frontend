import {
  FETCH_REPLAYS,
  FETCH_CURRENT_REPLAY_STATS
} from '../actions/replay_actions';

import MatchSummaryDataTransformer from '../lib/MatchSummaryDataTransformer';

const defaultState = {
  allReplays: [{ "mapname": "ABC", "replayid": "k3ikdjfdk" }],
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
      let matchSummaryDataTransformer = new MatchSummaryDataTransformer(action.payload.data[0]);
      let currentReplay = matchSummaryDataTransformer.transform();
      return {...state, currentReplay: currentReplay}
    default:
      return state;
  }

}
