import React, {Component} from 'react';
import ReactNative from 'react-native';
import { bindActionCreators } from 'redux';
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
import images from '@assets/images';
import { facebookLogin } from '../actions/auth';


const FBSDK = require('react-native-fbsdk');
const {
  LoginButton,
} = FBSDK;


class Auth extends Component{
  onLoginPressed(){
    this.props.actions.facebookLogin();
  }
  onLogoutPressed(){
    this.props.actions.facebookLogout();
  }
  componentWillMount(){
  }

  render(){
    return(
      <View style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <TouchableHighlight onPress={this.onLoginPressed.bind(this)}>
          <View style={{
            width: 55,
            height: 40,
            justifyContent: 'center', alignItems: 'center',
            backgroundColor:'#2db0d3',
            borderRadius:3,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0}}>
            <Image source={images.facebookWhiteCircularLogo} style={{width:25, height:25}} />
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.onLoginPressed.bind(this)}>
          <View style={{
            padding: 10,
            width: 180,
            height: 40,
            backgroundColor:'#3cc8ee',
            borderRadius:3,
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
            borderWidth: 0}}>
            <Text style={{fontSize:16, textAlign:'center', color:'white', fontFamily:'Avenir-Light'}}>Sign in to Facebook</Text>
          </View>
        </TouchableHighlight>
      </View>

    );
  }
}

// Match state to props which allows us to access actions
function mapStateToProps(state){
  return {
    loginStatusMessage: state.loginStatusMessage,
    facebookToken: state.loginStatusMessage,
    facebookProfile: state.facebookProfile,
    message: state.message,
    logoutMessage: state.logoutMessage,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ facebookLogin }, dispatch),
  };
}
//

// Connects the state variables to the property variables within
// the home class
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
