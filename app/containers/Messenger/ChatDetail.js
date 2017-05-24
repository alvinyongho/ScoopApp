import React, {Component} from 'react';
import ReactNative from 'react-native';
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableHighlight,
  StyleSheet,
  Navigator,
  Dimensions,
  TextInput,
  Animated
} from 'react-native';

import MessageBubble from './MessageBubble';
import Button from 'react-native-button'

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default class ChatDetail extends Component{
  componentWillMount () {
    // this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow',
    //   this._keyboardDidShow)
    // this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide)

  }
  //
  // _keyboardDidHide(){
  //   alert('Keyboard shown')
  // }
  //
  // _keyboardDidShow(){
  //   alert('Keyboard hidden')
  // }

  render(){
    return(


      <Animated.View style={{flex:1}}>
          <ScrollView style={styles.container}>
            <View style={styles.datetimeContainer}>
              <Text style={styles.datetimeText}>April 28, 2017  8:10 PM</Text>
            </View>

            <MessageBubble />

          </ScrollView>

          <View style={{backgroundColor:"#F0F0F0", flexDirection: 'row'}}>
          <TextInput placeholder={'Type message'}
            style={{
              flex: .82,
              borderRadius: 5,
            borderWidth: 1,
            fontFamily: 'Avenir-Light',
            margin: 7,
            height: 44,
            backgroundColor: 'white',
            borderColor: '#D1D1D1',
            paddingHorizontal: 10,}} />

            <View style={{flex:.18, margin: 7, alignItems: 'center', justifyContent: 'center'}}>
          <Button>
            <Text style={{fontSize: 20, fontFamily: 'Avenir', color:'#A2DDEE', fontWeight:'bold',}}>Send </Text>
          </Button>

          </View>
          </View>

      </Animated.View>

    )
  }
}


var styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'white'
  },
  datetimeContainer: {
    height: 30,
    marginTop: 20,
  },
  datetimeText: {
    textAlign:'center',
    color: '#888888'
  }
})
