import React, {Component} from 'react';
import ReactNative from 'react-native';
import { connect } from 'react-redux';
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';


const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
} = FBSDK;


class Auth extends Component{
  componentWillMount(){
  }

  render(){
    return(
      <View>
        <LoginButton
          publishPermissions={["publish_actions"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                alert("Login failed with error: " + result.error);
              } else if (result.isCancelled) {
                alert("Login was cancelled");
              } else {
                alert("Login was successful with permissions: " + result.grantedPermissions)
              }
            }
          }
          onLogoutFinished={() => alert("User logged out")}/>
      </View>
    );
  }
}

// Match state to props which allows us to access actions
function mapStateToProps(state){
  return {
    foundMatches: state.foundMatches
  }
}


// Connects the state variables to the property variables within
// the home class
export default connect(mapStateToProps)(Auth);
