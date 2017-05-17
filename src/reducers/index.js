import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import SessionReducer from './session_reducer';
import ReplayReducer from './replay_reducer';
import ErrorReducer from './ErrorReducer';

 const rootReducer = combineReducers({
  replays: ReplayReducer,
  errors: ErrorReducer,
  session: SessionReducer,
  routing: routing
});

export default rootReducer;
