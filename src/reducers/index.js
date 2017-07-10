import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import UserReducer from './UserReducer';
import PlayerReducer from './PlayerReducer';
import SessionReducer from './SessionReducer';
import ReplayReducer from './replay_reducer';
import PlayerCompareReducer from './PlayerCompareReducer';
import ErrorReducer from './ErrorReducer';

 const rootReducer = combineReducers({
  user: UserReducer,
  replays: ReplayReducer,
  player: PlayerReducer,
  playerCompare: PlayerCompareReducer,
  error: ErrorReducer,
  session: SessionReducer,
  routing: routing
});

export default rootReducer;
