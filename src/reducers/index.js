import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import SessionReducer from './session_reducer';
import ReplayReducer from './replay_reducer';
import ErrorReducer from './ErrorReducer';

 const rootReducer = combineReducers({
  replays: ReplayReducer,
  error: ErrorReducer,
  session: SessionReducer,
  routing: routing
});

export default rootReducer;
