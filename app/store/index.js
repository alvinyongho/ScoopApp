import { createStore } from 'redux';
import scoopAppReducer from '../reducers';

import devToolsEnhancer from 'remote-redux-devtools';
const scoopAppStore = createStore(scoopAppReducer, devToolsEnhancer());


// const scoopAppStore = createStore(scoopAppReducer);

export default scoopAppStore;
