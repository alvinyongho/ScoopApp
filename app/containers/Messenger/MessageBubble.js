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

const screen_padding = 10
const max_margin_to_screen = 50


export default class MessageBubble extends Component{

  constructor(props){
    super(props)
  }

  getBubbleStyle = (shiftAmount) => {
  }

  render(){
    return(

    <View>

    <View style={{
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    }}>

      <View style={{flexDirection: 'row', marginTop: 10}}>
        <View style={{
            flex: -1,
            marginLeft: max_margin_to_screen,
            marginRight: screen_padding,
            backgroundColor: 'skyblue',
            borderRadius: 10,
            padding: 5,
          }}>
          <Text style={{
                    color: 'white',
                    fontFamily:'Avenir-Light', fontSize:18}}> This is a very long line lol with a lot of additional other text that will extend to the next line maybe </Text>
        </View>
      </View>

      <View style={{flexDirection: 'row', marginTop: 10}}>
        <View style={{
            flex: -1,
            marginLeft: max_margin_to_screen,
            marginRight: screen_padding,
            backgroundColor: 'skyblue',
            borderRadius: 10,
            padding: 5,
          }}>
          <Text style={{
                    color: 'white',
                    fontFamily:'Avenir-Light', fontSize:18}}> LOL </Text>

        </View>
      </View>
    </View>




    {/* REPLY */}
    <View style={{
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    }}>

      <View style={{flexDirection: 'row', marginTop: 10}}>
        <View style={{
            flex: -1,
            marginLeft: screen_padding,
            marginRight: max_margin_to_screen,
            backgroundColor: 'pink',
            borderRadius: 10,
            padding: 5,
          }}>
          <Text style={{
                    color: 'white',
                    fontFamily:'Avenir-Light', fontSize:18}}> This is the reply </Text>
        </View>
      </View>

      <View style={{flexDirection: 'row', marginTop: 10}}>
        <View style={{
            flex: -1,
            marginLeft: screen_padding,
            marginRight: max_margin_to_screen,
            backgroundColor: 'pink',
            borderRadius: 10,
            padding: 5,
          }}>
          <Text style={{
                    color: 'white',
                    fontFamily:'Avenir-Light', fontSize:18}}> Ayyyy </Text>

        </View>
      </View>
    </View>

    </View>
  );
  }
}


var styles = StyleSheet.create({
  // container: {
  //   marginBottom: 15
  // },
  // rightBubble: {
  //   borderRadius: 7,
  //   padding: 10,
  //   height: 35,
  //   backgroundColor: 'blue'
  // },
  // leftBubble: {
  //   borderRadius: 7,
  //   padding: 10,
  //   height: 35,
  //   backgroundColor: 'red'
  // }
})
