import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

import Swiper from 'react-native-swiper';
import { Link } from 'react-router-native';
import images from '@assets/images';


export default class LoginPage extends Component {
  render(){
    const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>;
    return(
        <View style={{flex: 1, margin:40, marginBottom:60}}>
          <View style={{flex: 1.35, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={images.splashImg} style={{width:120, height:90, resizeMode: 'contain',}} />
            <Image source={images.scoopLogoBlue} style={{width:150, height:80, resizeMode: 'contain',}} />
          </View>
          <View style={{flex: 1.8}}>
            <Text style={{padding: 10, paddingLeft: 25, paddingRight: 25, fontSize:20, textAlign:'center', fontFamily:'Avenir-Light'}}>
              Let us do the leg work, date someone with mutual interests by
              connecting your favorite apps to Scoop
            </Text>
            <Text style={{padding: 10, paddingLeft: 25, paddingRight: 25, fontSize:20, textAlign:'center', fontFamily:'Avenir-Light'}}>
              Get quality matches without the questionnaires.
            </Text>
          </View>

          <View style={{flex: 1}}>
            <View style={{flex: 1}}>
              <Text style={{padding:10, fontSize:11, textAlign:'center', fontFamily:'Avenir-Light'}}>
                By logging in, you agree to our <B>terms of use</B> and <B>private policy</B>.
              </Text>
            </View>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>

              <Link to="/login">
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
              </Link>

              <Link to="/login">
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
              </Link>
            </View>
            <View style={{flex: 1}}>
              <Text style={{margin:10, fontSize:11, textAlign:'center', fontFamily:'Avenir-Light'}}>
                Scoops will never post to your Facebook Account without your
                permission.
              </Text>
            </View>
          </View>
        </View>
    );
  }
}


var styles = StyleSheet.create({

})
