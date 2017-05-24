import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';



class Slider extends Component {
  render(){
    return(
      <View style={{height: 5, borderRadius:5/2, backgroundColor: 'purple'}}>
      </View>
    );
  }
}



export default class ProfileSlider extends Component {

  constructor(props){
    super(props)
  }

  render(){
    return (

      <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>

        <View style={{margin: 20, }}>
          <Slider />
          <View style={{flexDirection: 'row', marginTop: 30, marginBottom: 20}}>
            <Text style={[styles.sliderValueText, styles.sliderLeftValueText]}>RELATIONSHIP</Text>
            <Text style={[styles.sliderValueText, styles.sliderRightValueText]}>FRIENDSHIP</Text>
          </View>
        </View>

        <View style={{marginLeft: 20, height:1, backgroundColor:'#E6E6E6'}} />

        <View style={{flexDirection: 'row', margin: 20, marginTop: 30, marginBottom: 20}}>
          <Text style={[styles.sliderValueText, styles.sliderLeftValueText]}>MEN</Text>
          <Text style={[styles.sliderValueText, styles.sliderMidValueText]}>BOTH</Text>
          <Text style={[styles.sliderValueText, styles.sliderRightValueText]}>WOMEN</Text>
        </View>
      </View>

    );
  }

}


var styles = StyleSheet.create({
  sliderValueText: {
    fontSize: 16, fontFamily: 'Avenir-Light',
    color: '#888888'
  },
  sliderLeftValueText: {
    textAlign: 'left',
    flex: 1
  },
  sliderRightValueText: {
    textAlign: 'right',
    flex: 1
  },
  sliderMidValueText: {
    textAlign: 'center',
    flex: 1
  },

});
