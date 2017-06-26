import React, {Component} from 'react';
import ReactNative from 'react-native';
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableHighlight,
  StyleSheet,
  Button,
  Navigator,
} from 'react-native';


export class AddButton extends Component{
    render(){
      circle_size = 25
      border_width = 1.0
      line_width = border_width
      circle_pad = 10

      return(
        <View style={{height: circle_size,
                      width: circle_size,
                      borderRadius: circle_size/2,
                      borderWidth:border_width,
                      borderColor: '#45C8EC',
                      alignItems: 'center',
                      justifyContent: 'center'}}>
          <View style={{position: 'absolute', height: line_width, width: circle_size-circle_pad, backgroundColor: '#45C8EC'}}/>
          <View style={{position: 'absolute', height: circle_size-circle_pad, width: line_width, backgroundColor: '#45C8EC'}}/>

        </View>
      );
    }
}


export default class ImportPhotoContainer extends Component{

  render(){
    return(
        <View style={{flex:1}}>
          <TouchableHighlight onPress={()=>this.props.handlePress()}>
          <View style={{height: 230, margin: 10, borderWidth: 1, borderColor: '#DFDFDF', borderRadius: 5, backgroundColor:'white', alignItems: 'center', justifyContent: 'center'}}>
            <AddButton />
          </View>
          </TouchableHighlight>
        </View>
    );

  }
}
