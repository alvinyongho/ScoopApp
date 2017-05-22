import  {combineReducers} from 'redux';
// import authReducer from './auth';
import * as feedlistReducer from './feedlist';
import * as authReducer from './auth';
import * as messengerReducer from './messenger';


// Navigation Reducers
import * as homeNavReducer from './homeNav';
import * as myProfileNavReducer from './myProfileNav';
import * as messengerNavReducer from './messengerNav';
import * as tabNavReducer from './tabNav';


// manage states using different reducers
export default combineReducers(Object.assign(
  feedlistReducer,
  authReducer,
  homeNavReducer,
  myProfileNavReducer,
  tabNavReducer,
  messengerNavReducer,
  messengerReducer,
));
