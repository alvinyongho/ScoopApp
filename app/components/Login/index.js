import React, { Component } from 'react';

import {
  View,
  Text,
  Navigator,
  TouchableHighlight
} from 'react-native';

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken
} = FBSDK;

import {ScoopStackNavigator} from '../TabNavigator/index.js'


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
  }

  componentWillMount() {
    AccessToken.getCurrentAccessToken().then(
      (data) => {
          this.setState({loggedIn: true})
    })
  }
  render() {

    if(this.state.loggedIn === true){
      return (
        <ScoopStackNavigator />
      )
    }
    else {
      return (
        <LoginButton
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {
              let isAuthenticated;
              if (error) {
                alert("Login failed with error: " + result.error);
                isAuthenticated: false
              } else if (result.isCancelled) {
                alert("Login was cancelled");
                isAuthenticated: false
              } else {
                alert("Login was successful with permissions: " + result.grantedPermissions)
                isAuthenticated: true
              }
              this.setState({
                loggedIn: isAuthenticated,
              });
            }
          }
          onLogoutFinished={() => {
            alert("User logged out");
            isAuthenticated: false;
            this.setState({
              loggedIn: isAuthenticated,
            });
          }}/>
      );
    }
  }
}


//
// navigatorRenderScene(route, navigator) {
//     _navigator = navigator;
//     switch (route.id) {
//       case 'loginElements':
//         return (
//           <LoginButton
//             publishPermissions={["publish_actions"]}
//             onLoginFinished={
//               (error, result) => {
//                 if (error) {
//                   alert("Login failed with error: " + result.error);
//                 } else if (result.isCancelled) {
//                   alert("Login was cancelled");
//                 } else {
//                   alert("Login was successful with permissions: " + result.grantedPermissions)
//                   navigate('ScoopAppNavigator');
//                 }
//               }
//             }
//             onLogoutFinished={() => alert("User logged out")}/>
//         );
//       case 'second':
//         return (<Text>TODO: SCOOP NAVIGATOR</Text>);
//     }
//   }
