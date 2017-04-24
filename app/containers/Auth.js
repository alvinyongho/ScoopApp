import React, {Component} from 'react';
import ReactNative from 'react-native';
import { bindActionCreators } from 'redux';
import { facebookLogin } from '../actions/auth';
import { connect } from 'react-redux';
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableHighlight,
  StyleSheet,
  Button,
} from 'react-native';


const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
} = FBSDK;


class Auth extends Component{
  onLoginPressed(){
    console.log('logging in with facebook???')
    this.props.actions.facebookLogin();
  }
  componentWillMount(){
  }

  render(){
    return(
      <View>
        <Button title="Login with Facebook" onPress={this.onLoginPressed.bind(this)} />
      </View>
    );
  }
}

// Match state to props which allows us to access actions
function mapStateToProps(state){
  return {
    facebookLogin: state.facebookLogin
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ facebookLogin }, dispatch),
  };
}


// Connects the state variables to the property variables within
// the home class
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
