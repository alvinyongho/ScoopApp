import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
  Slider,
  Platform,
  Image
} from 'react-native';

import Dimensions from 'Dimensions';
import MultiSlider from '../components/MultiSlider/MultiSlider'
import images from '@assets/images';
// import NavigationBar from '../components/NavigationBar';


// var Slider = require('react-native-slider');
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


const ATTR_TITLE_HEIGHT = 35
const LEFT_RIGHT_PADDING = 20
const SLIDER_LENGTH = screenWidth - (2*LEFT_RIGHT_PADDING)
const SLIDER_HEIGHT = 30


class FilterItem extends Component{
  constructor(props) {
    super(props);
    this.state = {
      leftValue: 0,
      rightValue: 1,
      defaultValue: null,   // Default type of slider
      stepValue: null,
    };
  }

  updateState(value){
    switch(this.props.sliderType){
      case 'step':
        console.log('step')
        console.log(value.newValue)
        break;
      case 'multi':
        console.log('multi')
        console.log(value.left)
        console.log(value.right)

        this.setState({
                        leftValue: value.left,
                        rightValue: value.right
                     })
        break;
      default:
        console.log('default')
        console.log(value.newValue)
    }
  }

  render() {
    const {
      attributeText,
      statusText,
      attrLeftText,
      attrRightText,
      attrMidText,
      sliderType,
      disabled,
      stepAmount,
      trueMin,
      trueMax,
      ...other,
    } = this.props;


    let slider = null;
    if (sliderType === 'multi'){
      slider =
      <View style={styles.sliderContainer}>
              <MultiSlider
                 trackWidth = {SLIDER_LENGTH}
                 defaultTrackColor = {'#EFDAC6'}
                 leftThumbColor = {'#ECA45C'}
                 rightThumbColor = {'#ECA45C'}
                 rangeColor = {'#ECA45C'}
                 leftValue = {this.state.leftValue}
                 rightValue = {this.state.rightValue}

                 onLeftValueChange = {(leftValue) =>
                   this.updateState({left: leftValue,
                                     right: this.state.rightValue})}
                 onRightValueChange = {(rightValue) =>
                   this.updateState({left: this.state.leftValue,
                                     right: rightValue})}
               />

      </View>
    }
    if (sliderType === 'step') {
      slider = <Slider step={this.props.stepAmount}
                  trackImage={images.sliderSnapTrack}
                  thumbImage={images.sliderThumb}
                  thumbTintColor={'#ECA45C'}
                  onValueChange = {(newValue) => this.updateState({newValue})}
                  style={{marginLeft:20, marginRight:20}} />
    } if(sliderType === 'default' ){
      slider = <Slider
                  trackImage={images.sliderTrack}
                  thumbImage={images.sliderThumb}
                  thumbTintColor={'#ECA45C'}
                  onValueChange = {(newValue) => this.updateState({newValue})}
                  style={{marginLeft:20, marginRight:20}} />
    }


    return(
      <View style={{flexDirection: 'column', paddingTop:15, backgroundColor:'white'}}>
        <View style={{width: screenWidth, height: ATTR_TITLE_HEIGHT}}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={[styles.attrTitleContainer, styles.hasLeftPadding]}>
              <Text style={[{textAlign:'left'}, styles.attrTitleText]}>{this.props.attributeText}</Text>
            </View>
            <View style={[styles.attrTitleContainer, styles.hasRightPadding]}>
              <Text style={[{textAlign:'right'}, styles.attrTitleText, styles.grayText]}>{this.props.statusText}</Text>
            </View>
          </View>
        </View>

        {slider}

        <View style={{width: screenWidth, height: 30}}>
          <View style={styles.attrValBottomBorder}>
            {attrLeftText &&
              <View style={styles.attrValueContainer}>
                <Text style={[styles.attrValueText, styles.hasLeftPadding, {textAlign:'left'}, ]}>{this.props.attrLeftText}</Text>
              </View>
            }
            {attrMidText &&
              <View style={styles.attrValueContainer}>
                <Text style={[styles.attrValueText, {textAlign:'center'}]}>{this.props.attrMidText}</Text>
              </View>
            }
            {attrRightText &&
              <View style={styles.attrValueContainer}>
                <Text style={[styles.attrValueText, styles.hasRightPadding, {textAlign:'right'}]}>{this.props.attrRightText}</Text>
              </View>
            }
          </View>
        </View>

      </View>

    );
  }
}


export default class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {filterSettings: []};
  }

  updateFilterSetting(filter) {
    var filters = this.state.filterSettings;
    contacts.push(filter);
    this.setState({filterSettings: filters});
  }

  render() {
    return(
      <View style={{backgroundColor:'#E6E6E6'}}>
        <ScrollView style={{height:screenHeight}}>
          <FilterItem
            attributeText='Search Radius'
            statusText='200 miles'
            sliderType='default'
          />
          <FilterItem
            attributeText='Age Range'
            statusText='18 - 99 years'
            trueMin={18}
            trueMax={99}
            sliderType='multi'
          />
          <FilterItem
            attributeText='Height'
            statusText='3&#39;0&#34; - 8&#39;0&#34;'
            sliderType='multi'
          />
          <FilterItem
            attributeText='I Am Looking For'
            showAttrLeft='true'
            sliderType='multi'

            attrLeftText='Relationship'
            attrRightText='Friendship'
          />
          <FilterItem
            attributeText='I Am Interested In'
            statusText='200 miles'
            attrLeftText='Men'
            attrMidText='Both'
            attrRightText='Women'
            sliderType='step'
            stepAmount={.5}
          />
        </ScrollView>
      </View>
    );
  }
}


var styles = StyleSheet.create({
  attrTitleContainer: {
    flex: 1,
    justifyContent: 'center',
    height: ATTR_TITLE_HEIGHT
  },

  hasLeftPadding:{
    paddingLeft:LEFT_RIGHT_PADDING
  },

  hasRightPadding:{
    paddingRight:LEFT_RIGHT_PADDING
  },

  attrTitleText: {
    fontSize: 18,
    fontFamily: 'Avenir-Light'
  },

  attrValueContainer:{
    flex: 1,
    height: 30,
  },

  attrValBottomBorder:{
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#D1D1D1'
  },

  attrValueText:{
    fontSize:14,
    fontFamily: 'Avenir-Light',
    color: '#474747',
  },

  grayText: {
    color: '#474747',
  },

  sliderContainer: {
    width: screenWidth,
    height: SLIDER_HEIGHT,
    alignItems:'center',
    justifyContent: 'center'
  }
});
