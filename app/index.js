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

import { StackNavigator } from 'react-navigation';
import Login from './components/Login/index.js'
import FeedList from './components/FeedList/index.js'


export default class AppEntry extends Component {
  constructor(props) {
    super (props);
    this.state = {      
    };
  }



  render() {
    return(
      <Login />
    )
  }
}
