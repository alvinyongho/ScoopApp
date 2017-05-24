

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';


export default class SectionTitle extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return (
      <View style={{paddingTop: 30, paddingBottom: 15, backgroundColor: '#E6E6E6', paddingLeft: 10}}>
        <Text style={{fontSize:16, fontFamily:'Avenir-Light', color: '#666666'}}> {this.props.title} </Text>
      </View>
    );
  }

}
