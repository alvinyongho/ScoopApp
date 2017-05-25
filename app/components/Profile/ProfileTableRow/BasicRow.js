import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';


export default class BasicRow extends Component {

  constructor(props){
    super(props)
  }

  render(){
    return (
      <View>
        <View style={{padding: 10, paddingTop: 12, paddingLeft: 0, backgroundColor: 'white', flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={{fontSize: 16, fontFamily: 'Avenir-Light', color:'#666666', flex:.3}}> {this.props.rowItemName} </Text>
          <Text style={{textAlign: 'right', fontSize: 16, fontFamily: 'Avenir-Light', color:'#888888', flex: .7}}> {this.props.rowItemValue}</Text>
        </View>

        {this.props.hasDivider &&
        <View style={{marginLeft: 20, height:1, backgroundColor:'#E6E6E6'}} />
        }
      </View>

    );
  }

}
