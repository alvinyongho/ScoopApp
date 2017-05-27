import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';


export default class SettingsRowSpacer extends Component {

  constructor(props){
    super(props)
  }

  render(){
    return (

        <View style={{marginLeft: 20, height:20, backgroundColor:'#E6E6E6'}} />


    );
  }

}
