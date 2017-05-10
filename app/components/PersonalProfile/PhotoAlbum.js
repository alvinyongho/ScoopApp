import React, {Component} from 'react'

import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';


export default class PhotoAlbum extends React.Component {

  render(){
    return (
      <View>
      <TouchableWithoutFeedback
        delayLongPress={400}
        onPress={() => console.log("pressed the touchable highlight")}
        onLongPress={() => console.log("handling long press instead")}
        >
        <View
          style={{width: 250, height: 100, backgroundColor: 'white'}}>
          <Text>Toggle</Text>
        </View>
      </TouchableWithoutFeedback>
      </View>
    );
  }

}
