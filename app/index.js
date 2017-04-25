import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import reducer from './reducers'
import AppContainer from './containers/AppContainer';
import {persistStore, autoRehydrate} from 'redux-persist'
import {AsyncStorage} from 'react-native'

// middleware that logs actions
const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__  });

function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      loggerMiddleware,
    ),
    autoRehydrate()
  );

  const store = createStore(reducer, initialState, enhancer);
  // begin periodically persisting the store
  persistStore(store, {storage: AsyncStorage})
  return store;
}

const store = configureStore({})

export const App = () => (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);
