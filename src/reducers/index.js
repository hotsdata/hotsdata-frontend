import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import ReplayReducer from './replay_reducer';
import ErrorReducer from './ErrorReducer';

 const rootReducer = combineReducers({
  replays: ReplayReducer,
  errors: ErrorReducer,
  routing: routing
});

export default rootReducer;
