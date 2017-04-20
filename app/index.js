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


import { Provider, connect } from 'react-redux'

import { StackNavigator } from 'react-navigation';
// import Login from './components/Login/index.js'
import FeedList from './components/FeedList/index.js'
import reducers from './reducers';
import store from './store';


import {facebookLogin} from './actions/auth.js'
import LoginUser from './containers/LoginUser.js'

export default class AppEntry extends Component {
  constructor(props) {
    super (props);
    this.state = {
    };
  }

  render() {
    return(
      <Provider store={store}>
        <LoginUser />
      </Provider>
    )
  }
}

// AddTodo = connect()(AddTodo)
