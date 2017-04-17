import React, { Component } from 'react';
import {
  View,
  Image,
  Navigator, TouchableHighlight,
  Button,
  Text
} from 'react-native';

import Login from '../Login/index.js'

import { StackNavigator } from 'react-navigation';
const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken
} = FBSDK;

export default class TabNavigator extends Component {
  // static navigationOptions = {
  //   title: 'Scoop',
  // };
  constructor(props) {
    super (props);
    this.state = {
      redirectToLogin: false
    };
  }
  render() {
    // const { navigate } = this.props.navigation;

    if(this.state.redirectToLogin === false){
      return(
        <View>
          <Text>TODO: Insert Feed here</Text>
          <LoginButton
          onLogoutFinished={() => {
            this.setState({
              redirectToLogin: true,
            });
          }}/>
        </View>
      )
    }

    else {
      return(<Login />)
    }
  }
}
//
//
// export const ScoopStackNavigator = StackNavigator({
//   Feed: {screen: FeedList},
// });
