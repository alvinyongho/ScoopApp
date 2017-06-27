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

const screen_padding = 5
const max_margin_to_screen = 50
const fontSizeValue = 16

import images from '@assets/images';


export default class MessageBubble extends Component{

  constructor(props){
    super(props)
  }

  render(){
    if(this.props.isSelf) {
      return(
        <View style={styles.rightBubblePosition}>
          <View style={styles.rowSpacing}>

          <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>

            <View style={styles.rightBubble}>
              <Text style={[styles.fontStyle, {color: 'white'}]}>{this.props.text}</Text>
            </View>

            <Image source={images.msgBubbleTail_self} style={{width: 9, height: 10, bottom: 8}}/>
          </View>

          </View>
        </View>
      )
    }
    {/*REPLY*/}
    return (
      <View style={styles.leftBubblePosition}>
        <View style={styles.rowSpacing}>

        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>


          <Image source={images.msgBubbleTail_other} style={{width: 9, height: 10, bottom: 8}}/>


          <View style={styles.leftBubble}>
            <Text style={[styles.fontStyle, {color: 'black'}]}>{this.props.text}</Text>
          </View>


        </View>
        </View>
      </View>
    );
  }
}


var styles = StyleSheet.create({
  fontStyle: {
    fontFamily:'Avenir-Light',
    fontSize: fontSizeValue
  },
  rowSpacing: {
    flexDirection: 'row',
    marginTop: 10
  },
  rightBubblePosition: {
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  rightBubble: {
      flex: -1,
      marginLeft: max_margin_to_screen,
      marginRight: 0,
      backgroundColor: '#54C9EC',
      borderRadius: 10,
      padding: 5,
      paddingLeft: 8,
      paddingRight: 8,
    },
    leftBubblePosition: {
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    leftBubble: {
      flex: -1,
      // marginLeft: screen_padding,
      marginRight: max_margin_to_screen,
      backgroundColor: '#EFEFEF',
      borderRadius: 10,
      padding: 5,
      paddingLeft: 8,
      paddingRight: 8,
    }
})
