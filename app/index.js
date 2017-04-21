import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';

const loggerMiddleware = createLogger({predicate: (getState, action) => __DEV__ });


function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware,      // API requests/requests with promises
      loggerMiddleware,
    ),
  );
  return create(reducer, initialState, enhancer)  // enhancer: configuration of store
}

export default class AppEntry extends Component {
  render() {
    return(
      <View>
        <Text>Testing123</Text>
      </View>
    )
  }
}

// AddTodo = connect()(AddTodo)
