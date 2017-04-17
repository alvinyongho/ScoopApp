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
  static navigationOptions = {
    title: 'Welcome',
  };
  constructor(props) {
    super (props);

    this.state = {};
  }
  render() {
    const { navigate } = this.props.navigation;
    return(
      <View>
        <Login />
        <Button
          onPress={() => navigate('Feed')}
          title="Go to HomeFeed: FeedList"
        />
      </View>
    )
  }
}


export const ScoopAppNavigator = StackNavigator({
  AppEntry: {screen: AppEntry},
  Login: {screen: Login},
  Feed: {screen: FeedList},
});
