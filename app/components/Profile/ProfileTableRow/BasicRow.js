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
        <View style={{padding: 10, paddingTop: 12, backgroundColor: 'white', flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={{fontSize: 20, fontFamily: 'Avenir-Light', color:'#666666', flex:.5}}> {this.props.rowItemName} </Text>
          <Text style={{textAlign: 'right', fontSize: 20, fontFamily: 'Avenir-Light', color:'#888888', flex: .5}}> {this.props.rowItemValue}</Text>
        </View>

        {this.props.hasDivider &&
        <View style={{marginLeft: 20, height:1, backgroundColor:'#E6E6E6'}} />
        }
      </View>

    );
  }

}
