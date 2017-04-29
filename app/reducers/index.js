import  {combineReducers} from 'redux';
// import authReducer from './auth';
import * as feedlistReducer from './feedlist';
import * as authReducer from './auth';

// Navigation Reducers
import * as homeNavReducer from './homeNav';

// manage states using different reducers
export default combineReducers(Object.assign(
  feedlistReducer,
  authReducer,
  homeNavReducer,

));
