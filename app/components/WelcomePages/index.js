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

import Dimensions from 'Dimensions';


export default class WelcomePages extends Component {
  render(){
    return(
      <Swiper style={styles.wrapper} showsButtons={false} loop={false}>
        <View>
          <Image source={images.welcome1} style={styles.pageImage}/>
        </View>
        <View>
          <Image source={images.welcome2} style={styles.pageImage}/>
        </View>
        <View>
          <Image source={images.welcome3} style={styles.pageImage}/>
        </View>
        <View>
          <Image source={images.welcome4} style={styles.pageImage}/>
        </View>
        <View style={styles.login}>
          <Text style={{fontSize:30}}>
            Let us do the leg work, date someone with mutual interests by
            connecting your favorite apps to Scoop
          </Text>
          <Text>
            By logging in, you agree to our terms of use and private policy.
          </Text>

          <Link to="/login">
            <Image source={images.signInButton} resizeMode='contain' style={{width: 300}}/>
          </Link>

          <Text>
            Scoops will never post to your Facebook Account without your
            permission.
          </Text>
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
