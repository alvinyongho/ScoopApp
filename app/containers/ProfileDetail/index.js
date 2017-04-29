import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';



export default class ProfileDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(
      <View style={{backgroundColor:'#E6E6E6'}}>
        <ScrollView>
          <Text> Profile Detail </Text>
        </ScrollView>
      </View>
    );
  }
}


var styles = StyleSheet.create({

});
