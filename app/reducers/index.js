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
import * as photoAlbumReducer from './photoAlbum';

import * as types from '../actions/types';


// manage states using different reducers
export const appReducer = combineReducers(Object.assign(
  feedlistReducer,
  authReducer,
  homeNavReducer,
  myProfileNavReducer,
  tabNavReducer,
  messengerNavReducer,
  messengerReducer,
  photoAlbumReducer,
));


export default rootReducer = (state, action) => {
  if (action.type === types.LOGOUT) {
    state = undefined
  }
  return appReducer(state, action)
}
