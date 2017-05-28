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

const screen_padding = 20
const max_margin_to_screen = 50
const fontSizeValue = 16


export default class MessageBubble extends Component{

  constructor(props){
    super(props)
  }

  render(){
    if(this.props.isSelf) {
      return(
        <View>
          <View style={styles.rightBubblePosition}>
            <View style={styles.rowSpacing}>
              <View style={styles.rightBubble}>
                <Text style={styles.fontStyle}>{this.props.text}</Text>
              </View>
            </View>
          </View>
        </View>
      )
    }
    {/*REPLY*/}
    return (
      <View>
        <View style={styles.leftBubblePosition}>
          <View style={styles.rowSpacing}>
            <View style={styles.leftBubble}>
              <Text style={styles.fontStyle}>{this.props.text}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}


var styles = StyleSheet.create({
  fontStyle: {
    color: 'white',
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
      marginRight: screen_padding,
      backgroundColor: 'skyblue',
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
      marginLeft: screen_padding,
      marginRight: max_margin_to_screen,
      backgroundColor: 'pink',
      borderRadius: 10,
      padding: 5,
      paddingLeft: 8,
      paddingRight: 8,
    }
})
