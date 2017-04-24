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
        <Image source={images.welcome1} style={styles.image}/>
      </View>
        <View>
          <Image source={images.welcome2} style={styles.image}/>
        </View>
        <View>
          <Image source={images.welcome3} style={styles.image}/>
        </View>
        <View>
          <Image source={images.welcome4} style={styles.image}/>
        </View>
        <View style={styles.login}>
          <Link to="/login">
            <Text style={styles.text}>Login with Facebook</Text>
          </Link>
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
  image: {
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
