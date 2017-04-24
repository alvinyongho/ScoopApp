import  {combineReducers} from 'redux';
// import authReducer from './auth';
import * as feedlistReducer from './feedlist';
import authReducer from './auth'

// manage states using different reducers
export default combineReducers(Object.assign(
  feedlistReducer,
  authReducer,
));
