import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Navigator, TouchableHighlight,
  Button,
} from 'react-native';


import { createStore } from 'redux';

import { StackNavigator } from 'react-navigation';
// import Login from './components/Login/index.js'
import FeedList from './components/FeedList/index.js'


const auth = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return [
        ...state,
        {
          loginStatusMessage: 'Logging in...',
        }
      ]
    case 'LOGIN_SUCCESS':
      return [
        ...state,
        {
          loginStatusMessage: 'Login successful',
        }
      ]
    case 'LOGIN_FAIL':
      return[
        ...state,
        {
          loginStatusMessage: 'Login failed'
        }
      ]
  }
}

const store = createStore(auth);


const Login = ({ loginMessage }) => (
  <h1>{loginMessage}</h1>
);


export default class AppEntry extends Component {
  constructor(props) {
    super (props);
    this.state = {
    };
  }

  render() {
    return(
      <View>
        <Text> Testing login </Text>
        <Login loginMessage={store.getState()} />
      </View>
    )
  }
}
