import  {combineReducers} from 'redux';
// import authReducer from './auth';
import * as feedlistReducer from './feedlist';

// manage states using different reducers
export default combineReducers(Object.assign(
  feedlistReducer,
));
