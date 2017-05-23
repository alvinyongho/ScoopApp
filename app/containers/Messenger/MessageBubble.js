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

export default class MessageBubble extends Component{

  constructor(props){
    super(props)
  }

  getBubbleStyle = (shiftAmount) => {
    return ({  
      marginLeft: screenWidth-shiftAmount,
      width: 100
    });
  }

  render(){
    if (this.props.isSelf) {
      return(
        <View style={styles.container}>
          <View style={[this.getBubbleStyle(110), styles.rightBubble]}>
            <Text style={{textAlign:'right', color: 'white'}}>{this.props.text}</Text>
          </View>
        </View>
      );
    } else {
      return(
        <View style={styles.container}>
          <View style={[this.getBubbleStyle(360), styles.leftBubble]}>
            <Text style={{textAlign:'left', color: 'white'}}>{this.props.text}</Text>
          </View>
        </View>
      );
    }
    
  }
}


var styles = StyleSheet.create({
  container: {
    marginBottom: 15
  },
  rightBubble: {
    borderRadius: 7, 
    padding: 10, 
    height: 35,
    backgroundColor: 'blue'
  },
  leftBubble: {
    borderRadius: 7, 
    padding: 10, 
    height: 35,
    backgroundColor: 'red'
  }
})

