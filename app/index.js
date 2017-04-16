import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class SharedEntry extends Component {
  constructor(props) {
    super (props);

    this.state = {};
  }
  render() {
    return(
      <View style={styles.container}>
        <Text>This is the entry point of the app</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
