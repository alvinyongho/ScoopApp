import React, { Component } from 'react';

import {
  View,
  Text,
  Navigator,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
  AccessToken
} = FBSDK;

import TabNavigator from '../TabNavigator/index.js'


export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
  }


  setTokenStorage(){
    AccessToken.getCurrentAccessToken().then(
      (data) => {
          if (data){
            this.setState({loggedIn: true})
          }
          else if (!data){
            this.setState({loggedIn: false})
          }

    })
  }

  componentWillMount() {
    // Verifies access token
    this.setTokenStorage();
  }
  render() {

    if(this.state.loggedIn === true){
      return (
        <TabNavigator />
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
              } else if (result.isCancelled) {
                alert("Login was cancelled");
              } else {
                alert("Login was successful with permissions: " + result.grantedPermissions)
              }
              this.setTokenStorage();
            }
          }
          onLogoutFinished={() => {
            this.setState({
              loggedIn: false,
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
