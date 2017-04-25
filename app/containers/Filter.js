import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
  Slider
} from 'react-native';

// var Slider = require('react-native-slider');




export default class Filter extends Component {
  render() {
    return(
      <View>
        <Text style={styles.text} >
          Test
        </Text>
        <Slider
          onValueChange={(value) => this.setState({value: value})} />
      </View>
    );
  }
}


var styles = StyleSheet.create({
  slider: {
    height: 10,
    margin: 10,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
    margin: 10,
  },
});
