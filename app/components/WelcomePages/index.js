import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
} from 'react-native';

import Swiper from 'react-native-swiper';
import { Link } from 'react-router-native';
import images from '@assets/images';

import Dimensions from 'Dimensions';


export default class WelcomePages extends Component {
  render(){
    return(
      <Swiper style={styles.wrapper} showsButtons={false} loop={false}>

        {/* Login page */}
        <View style={{flex: 1, margin:40, marginBottom:60}}>
          <View style={{flex: 1.25, backgroundColor: 'powderblue', justifyContent: 'center', alignItems: 'center'}}>
            <Image source={images.splashImg} style={{width:100, height:80, resizeMode: 'contain',}} />
            <Image source={images.scoopLogo} style={{width:150, height:80, resizeMode: 'contain',}} />
          </View>
          <View style={{flex: 1, backgroundColor: 'skyblue'}}>
            <Text style={{padding: 25, fontSize:20, textAlign:'center'}}>
              Let us do the leg work, date someone with mutual interests by
              connecting your favorite apps to Scoop
            </Text>
          </View>
          <View style={{flex: 1, backgroundColor: 'steelblue'}}>

            <View style={{flex: 1, backgroundColor: 'steelblue'}}>
              <Text style={{padding:20, fontSize:11, textAlign:'center'}}>
                By logging in, you agree to our terms of use and private policy.
              </Text>
            </View>

            <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <View style={{
                width: 60,
                height: 40,
                justifyContent: 'center', alignItems: 'center',
                backgroundColor:'#68a0cf',
                borderRadius:3,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                backgroundColor: 'powderblue'}}>
                <Image source={images.facebookWhiteCircularLogo} style={{width:30, height:30}} />
              </View>
              <Link to="/login">
              <View style={{
                padding: 10,
                width: 180,
                height: 40,
                backgroundColor:'#68a0cf',
                borderRadius:3,
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                borderWidth: 0,
                borderColor: '#fff'}}>
                <Text style={{fontSize:18, textAlign:'center', color:'white'}}>Sign in to Facebook</Text>
              </View>
              </Link>
            </View>

            <View style={{flex: 1, backgroundColor: 'steelblue'}}>
              <Text style={{margin:10, fontSize:11, textAlign:'center'}}>
                Scoops will never post to your Facebook Account without your
                permission.
              </Text>
            </View>

          </View>



        </View>
        {/* End of Login Page */}

        <View>
          <Image source={images.welcome2} style={styles.pageImage}/>
        </View>
        <View>
          <Image source={images.welcome3} style={styles.pageImage}/>
        </View>
        <View>
          <Image source={images.welcome4} style={styles.pageImage}/>
        </View>

      </Swiper>
    )
  }
}


var styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  pageImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  login: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
  }
})
