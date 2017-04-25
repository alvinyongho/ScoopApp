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

import Dimensions from 'Dimensions';

// var Slider = require('react-native-slider');
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


class FilterLabel extends Component {
  render(){
    return(
      <View >
        <Text style={styles.attributeTitle} >
          Search Radius
        </Text>
        <Text style={styles.statusText} >
          200 miles
        </Text>
      </View>
    );
  }
}


export default class Filter extends Component {
  render() {
    return(
      <View style={{flex: 1, flexDirection: 'column'}}>

        <View style={{width: screenWidth, height: 30}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 1, width: 50, height: 30, backgroundColor: 'powderblue', padding: 5, paddingLeft:25}}>
              <Text style={{textAlign:'left'}}>attributeTitle</Text>
            </View>
            <View style={{flex: 1, width: 50, height: 30, backgroundColor: 'skyblue', padding: 5, paddingRight:25}}>
              <Text style={{textAlign:'right'}}>statusText</Text>
            </View>
          </View>
        </View>


        <View style={{width: screenWidth, height: 30, backgroundColor: 'steelblue', justifyContent: 'center', padding: 10}}>
          <Slider style={styles.slider} />
        </View>

        <View style={{width: screenWidth, height: 30}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 1, width: 50, height: 30, backgroundColor: 'powderblue', padding: 5, paddingLeft:25}}>
              <Text style={{textAlign:'left'}}>Left</Text>
            </View>
            <View style={{flex: 1, width: 50, height: 30, backgroundColor: 'steelblue', padding: 5,}}>
              <Text style={{textAlign:'center'}}>Middle</Text>
            </View>
            <View style={{flex: 1, width: 50, height: 30, backgroundColor: 'skyblue', padding: 5, paddingRight:25}}>
              <Text style={{textAlign:'right'}}>Right</Text>
            </View>
          </View>
        </View>

      </View>

    );
  }
}


var styles = StyleSheet.create({
  slider: {
    margin: 0,
    backgroundColor: 'skyblue',
  },
  statusText: {
    fontSize: 14,
    textAlign: 'right',
    fontWeight: '100',
    margin: 10,
    height:50,
    backgroundColor: 'powderblue'
  },
  attributeTitle: {
    fontSize: 14,
    textAlign: 'left',
    fontWeight: '500',
    margin: 10,
    height:50,
    backgroundColor: 'powderblue'

  },
});
