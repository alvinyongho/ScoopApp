import React, {Component} from 'react';
import ReactNative from 'react-native';
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableHighlight,
  StyleSheet,
  Button,
  Navigator,
  Dimensions,
  TextInput,
  Keyboard
} from 'react-native';

import MessageBubble from './MessageBubble';

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


      <View style={{flex:1}}>

          <ScrollView style={styles.container}>
            <View style={styles.datetimeContainer}>
              <Text style={styles.datetimeText}>April 28, 2017  8:10 PM</Text>
            </View>





            <MessageBubble />



          </ScrollView>

      </View>

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
