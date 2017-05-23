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
  Dimensions
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default class ChatDetail extends Component{

  render(){
    return(
      <View style={{
        flex: 1,
        backgroundColor: 'white'}}>
        <View style={{height: 30, marginTop: 30, marginBottom: 30}}>
          <Text style={{textAlign:'center', color: '#666666'}}>April 28, 2017  8:10 PM</Text>
        </View>
      </View>
    )
  }
}
