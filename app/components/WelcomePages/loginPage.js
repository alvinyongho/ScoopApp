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
import Auth from '../../containers/Auth';
import ScalableText from 'react-native-text';

export default class LoginPage extends Component {
  render(){
    const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>;
    return(
        <View style={{flex: 1, margin: 30, marginBottom:60}}>
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={images.splashImg} style={{width:120, height:80, resizeMode: 'contain',}} />
            <Image source={images.scoopLogoBlue} style={{width:150, height:70, resizeMode: 'contain',}} />
          </View>
          <View style={{flex: 1, justifyContent:'center'}}>
            <ScalableText style={{paddingLeft: 20,paddingRight:20, fontSize:18, textAlign:'center', fontFamily:'Avenir-Light', }}>
              Let us do the leg work, date someone with mutual interests by
              connecting your favorite apps to Scoop
            </ScalableText>
            <ScalableText style={{padding: 10, textAlign:'center', fontSize:18, fontFamily:'Avenir-Light'}}>
              Get quality matches without the questionnaires.
            </ScalableText>
          </View>

          <View style={{flex: 1,}}>
            <View style={{flex: 1, paddingLeft:10, paddingRight:10, justifyContent:'flex-end'}}>
              <ScalableText allowFontScaling={true} style={{fontSize: 12, textAlign:'center', fontFamily:'Avenir-Light'}}>
                By logging in, you agree to our <B>terms of use</B> and <B>private policy</B>.
              </ScalableText>
            </View>

            {/* Login Button */}
            <Auth />

            <View style={{flex: 1}}>
              <ScalableText allowFontScaling={true} style={{margin:10, fontSize: 12, textAlign:'center', fontFamily:'Avenir-Light'}}>
                Scoops will never post to your Facebook Account without your
                permission.
              </ScalableText>
            </View>
          </View>
        </View>
    );
  }
}


var styles = StyleSheet.create({

})
