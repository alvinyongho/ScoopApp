import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';


export default class RowDivider extends Component {
  render(){
    return (
      <View>
        <View style={{height:1, backgroundColor: '#E6E6E6'}} />
      </View>
    );
  }
}
