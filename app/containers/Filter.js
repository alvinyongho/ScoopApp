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


import FilterItem from '../components/Filter/FilterItem'
import MultiSlider from '../components/Filter/MultiSlider'

import Dimensions from 'Dimensions';
import images from '@assets/images';
// import NavigationBar from '../components/NavigationBar';
// To Pass dispatching actions to containers
import { connect } from 'react-redux';        // handles state and actions
import { ActionCreators } from '../actions';   // Retrieves all the action creators
import { bindActionCreators } from 'redux';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


const ATTR_TITLE_HEIGHT = 35
const LEFT_RIGHT_PADDING = 20
const SLIDER_LENGTH = screenWidth - (2*LEFT_RIGHT_PADDING)
const SLIDER_HEIGHT = 30



export class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {    searchRadius: 1,
                      ageRange: {min:18, max:99},
                      isScrollEnabled: true
                 };

  }

  changeScrollState = (isEnabled) => {
    this.setState({isScrollEnabled: isEnabled})
  }

  updateFilterSetting(filter) {
    var filters = this.state.filterSettings;
    contacts.push(filter);
    this.setState({filterSettings: filters});
  }

  componentDidMount(){
    // get the filter settings
    this.props.fetchFilters()
  }

  render() {
    return(
      <View style={{backgroundColor:'#E6E6E6'}}>
        <ScrollView scrollEnabled={this.state.isScrollEnabled} style={{height:screenHeight-110}}>
          <MultiSlider changeScrollState={this.changeScrollState} />

          <FilterItem
            attributeText='Search Radius'
            statusText={`${this.state.searchRadius} miles`}
            sliderType='default'
            maxValue='200'
            onSliderUpdate={(value)=>{
                let sliderValue = Math.floor(200*value)
                this.setState({searchRadius: Math.max(1, sliderValue)})
              }
            }
          />

          <FilterItem
            attributeText='Age Range'
            statusText={`${this.state.ageRange.min} - ${this.state.ageRange.max}`}
            sliderType='multi'
            onMultiSliderUpdate={(minMaxValues)=> {
              let min = Math.floor(minMaxValues.left*81 + 18)
              let max = Math.floor(minMaxValues.right*81 + 18)
              this.setState({ageRange: {min: min,max: max}})
            }}
          />

          <FilterItem
            attributeText='Height'
            statusText='3&#39;0&#34; - 8&#39;0&#34;'
            sliderType='multi'

            onMultiSliderUpdate={(minMaxValues)=> {
              let min = Math.floor(minMaxValues.left)
              let max = Math.floor(minMaxValues.right)
              this.setState({heightRange: {min: min,max: max}})
            }}

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
            // statusText='200 miles'
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


// maps action creator calls to a dispatch to update the state
// Bind actions (dispatcher) to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

// Match state to props which allows us to access actions
function mapStateToProps(state){
  return {
    // foundMatches: state.foundMatches
  }
}

// Connects the state variables to the property variables within
// the home class
export default connect(mapStateToProps, mapDispatchToProps)(Filter);
