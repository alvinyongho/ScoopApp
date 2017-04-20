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

import { ScoopTabsNavigator } from '../ScoopTabs/index.js';

export default class ScoopRoot extends Component {
  constructor(props) {
    super (props);
    this.state = {
      redirectToLogin: false
    };
  }
  render() {
    if(this.state.redirectToLogin === false){
      // return(
      //   <View>
      //     <Text>TODO: Insert Feed here</Text>
      //     <LoginButton
      //     onLogoutFinished={() => {
      //       this.setState({
      //         redirectToLogin: true,
      //       });
      //     }}/>
      //   </View>
      // )

      return(
        <ScoopTabsNavigator />
      )


    }

    else {
      return(<Login />)
    }
  }
}
