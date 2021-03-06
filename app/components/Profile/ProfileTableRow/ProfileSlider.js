import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  PanResponder,
  Animated,
  Dimensions
} from 'react-native';

import MultiSlider from '../../Filter/MultiSlider'

export default class ProfileSlider extends Component {

  constructor(props){
    super(props)
  }

  createThumbs(positions){
    return positions.map((value)=>{
      return {initialPosition: value}
    })
  }

  static propTypes = {
    onRelease: PropTypes.func
  }

  static defaultProps = {
    onRelease: () => {},
  }


  render(){
    return (
      <View style={{flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
        <View style={styles.sliderContainer}>
          <MultiSlider changeScrollState={this.props.changeScrollState}
           onThumbMove={()=>{}}
           onRelease={(released_pos)=>{this.props.onRelease(released_pos)}}
           disabled={this.props.disabled}
           numSteps={this.props.numSteps}
           hasSteps={this.props.hasSteps}
           sliderLeftRightMargin={20}
           thumbs={this.createThumbs([this.props.thumbLocation])}
           />
         </View>

         <View style={styles.labelsContainer}>
          <View style={styles.labelBox}>
            <Text style={styles.sliderLabelText}>{this.props.leftLabel}</Text>
          </View>

          {this.props.middleLabel &&
            <View style={[styles.labelBox, {alignItems: 'center'}]}>
              <Text style={styles.sliderLabelText}>{this.props.middleLabel}</Text>
            </View>
          }

          <View style={[styles.labelBox, {alignItems: 'flex-end'}]}>
            <Text style={styles.sliderLabelText}>{this.props.rightLabel}</Text>
          </View>

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
  labelBox:{
    flex:.5,
    margin: 20,
    marginTop: 0,

  },
  labelsContainer:{
    flex: 1,
    flexDirection: 'row',

  },
  sliderLabelText:{
    fontFamily: 'Avenir-Light',
  },
  sliderContainer:{height: 40, backgroundColor: 'white'},
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
