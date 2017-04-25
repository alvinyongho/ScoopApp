import { createStore } from 'redux';
import scoopAppReducer from '../reducers';
import devToolsEnhancer from 'remote-redux-devtools';

const scoopAppStore = createStore(scoopAppReducer, devToolsEnhancer());
export default scoopAppStore;
