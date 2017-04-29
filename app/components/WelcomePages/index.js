import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
} from 'react-native';
import Swiper from 'react-native-swiper';
import images from '@assets/images';
import Dimensions from 'Dimensions';

import LoginPage from './loginPage'


export default class WelcomePages extends Component {
  render(){
    return(
      <Swiper style={styles.wrapper} showsButtons={false} loop={false}>
        <View>
          <Image source={images.welcome2} style={styles.pageImage}/>
        </View>
        <View>
          <Image source={images.welcome3} style={styles.pageImage}/>
        </View>
        <View>
          <Image source={images.welcome4} style={styles.pageImage}/>
        </View>
        <LoginPage />
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
