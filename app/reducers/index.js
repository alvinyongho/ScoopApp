import  {combineReducers} from 'redux';
import authReducer from './auth';

const scoopAppReducer = combineReducers({
  auth: authReducer,
})


export default scoopAppReducer;
