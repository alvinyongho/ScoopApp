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
import FilterRow from '../components/Filter/FilterRow'

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
    // console.log('setting default filters')
    this.props.fetchFilters()

  }

  computeInMiles = (sliderValue) => {
    return Math.floor(sliderValue * 200) + ' miles'
  }

  computeInMilesPOSTFormat = (sliderValue) =>{
    return Math.floor(sliderValue * 200)
  }

  computeSliderToHeight = (sliderValues) => {
    let min = 36
    let max = 96

    inchesArray = sliderValues.map((sliderValue)=>{
      return Math.floor(sliderValue*(max-min)+min)
    })

    ftInArray = this.inchesArrayToFtInArray(inchesArray)
    return ftInArray.sort().join(' - ')
  }

  computeAgeRangePostFormat = (sliderValues) =>{
    let min = 18
    let max = 99
    ageArray = sliderValues.map((sliderValue)=>{
      return Math.floor((sliderValue*(max-min))+min)
    })
    return ageArray.sort()
  }



  inchesArrayToFtInArray = (inchesArray) => {
    return inchesArray.map((inches)=>{
      return this.inchesToFt(inches)
    })
  }

  inchesToFt = (inches) => {
    ft = Math.floor(inches/12)
    inches = inches-(12*ft)
    return `${ft}'${inches}"`
  }

  computeSliderToAgeRange = (sliderValues) => {
    let min = 18
    let max = 99
    ageArray = sliderValues.map((sliderValue)=>{
      return Math.floor((sliderValue*(max-min))+min)
    })
    return ageArray.sort().join(' - ') + ' years'
  }

  computeHeightRangePostFormat = (sliderValues)=>{
    let min = 36
    let max = 96
    inchesArray = sliderValues.map((sliderValue)=>{
      return Math.floor(sliderValue*(max-min)+min)
    })
    return inchesArray.sort()
  }

  _getInitialAgeRange(){
    ageRange = this.props.prevSliderValues.AGE_RANGE.sort()
    min = Math.floor((ageRange[0] * (99-18))+18)
    max = Math.floor((ageRange[1] * (99-18))+18)
    return `${min} - ${max} years`
  }

  _getInitialHeightRange(){
    heightRange = this.props.prevSliderValues.HEIGHT.sort()
    minHeightInches = Math.floor((heightRange[0]*(96-36))+36)
    maxHeightInches = Math.floor((heightRange[1]*(96-36))+36)
    minHeightInches = minHeightInches
    maxHeightInches = maxHeightInches
    minHt = this.inchesToFt(parseInt(minHeightInches))
    maxHt = this.inchesToFt(parseInt(maxHeightInches))
    return `${minHt} - ${maxHt}`
  }


  computeLookingForPostFormat = (numSteps, sliderValues)=>{
    return this.computeStepPostFormat(numSteps, sliderValues)
  }


  computeGenderInterestPostFormat = (numSteps, sliderValues)=>{
    return this.computeStepPostFormat(numSteps, sliderValues)
  }


  computeStepPostFormat = (numSteps, sliderValues)=>{
    lookingForValues = sliderValues.map((value, index)=>{
      return (value * (numSteps-1))+1
    })
    return lookingForValues
  }

  updateSliderSettings = (type, positionArr) =>{
    this.props.updateSliderSetting(type, positionArr)
  }

  render() {
    return(
      <View style={{backgroundColor:'#E6E6E6'}}>
        <ScrollView scrollEnabled={this.state.isScrollEnabled} style={{height:screenHeight-110}}>

          {/* TODO: set the miles and the thumb position*/}
          <FilterRow
            changeScrollState={this.changeScrollState}
            topLeftTitle={'Search Radius'}
            containsSliderLabels={false}
            thumbPositions={[this.props.prevSliderValues.SEARCH_RADIUS[0]]}
            sliderColor={'#ECA45C'}
            sliderColorIsGradient={false}
            thumbColor={'orange'}


            initialValue={`${Math.floor(this.props.prevSliderValues.SEARCH_RADIUS[0]*200)} miles`}


            hasSteps={false}
            sliderResultFunction={this.computeInMiles}
            onSliderUpdate = {(positions)=>{
                                  this.props.changeFilterSetting({searchRadius:this.computeInMilesPOSTFormat(positions)})
                                  this.updateSliderSettings('SEARCH_RADIUS', positions)
                                }
                             }

          />

          <FilterRow
            changeScrollState={this.changeScrollState}
            topLeftTitle={'Age Range'}
            containsSliderLabels={false}
            thumbPositions={[this.props.prevSliderValues.AGE_RANGE[0],this.props.prevSliderValues.AGE_RANGE[1]]}
            sliderColor={'#ECA45C'}
            initialValue={this._getInitialAgeRange()}
            hasSteps={false}
            sliderResultFunction={this.computeSliderToAgeRange}
            onSliderUpdate = {(positions)=>{
                                this.props.changeFilterSetting({ageMin:this.computeAgeRangePostFormat(positions)[0]})
                                this.props.changeFilterSetting({ageMax:this.computeAgeRangePostFormat(positions)[1]})
                                this.updateSliderSettings('AGE_RANGE', positions)
                              }
                             }

          />

          <FilterRow
            changeScrollState={this.changeScrollState}
            topLeftTitle={'Height'}
            containsSliderLabels={false}
            thumbPositions={[this.props.prevSliderValues.HEIGHT[0], this.props.prevSliderValues.HEIGHT[1]]}
            sliderColor={'#ECA45C'}
            initialValue={this._getInitialHeightRange()}
            hasSteps={false}
            sliderResultFunction={this.computeSliderToHeight}

            onSliderUpdate = {(positions)=>{
                              this.props.changeFilterSetting({heightMin: this.computeHeightRangePostFormat(positions)[0]})
                              this.props.changeFilterSetting({heightMax: this.computeHeightRangePostFormat(positions)[1]})
                              this.updateSliderSettings('HEIGHT', positions)

              }
            }



          />

          <FilterRow
            changeScrollState={this.changeScrollState}
            topLeftTitle={'I Am Looking For'}
            containsSliderLabels={true}
            sliderLabels={['Relationship', 'Friendship']}
            thumbPositions={[this.props.prevSliderValues.LOOKING_FOR[0], this.props.prevSliderValues.LOOKING_FOR[1]]}
            sliderColor={'#ECA45C'}
            hasSteps={true}
            numSteps={5}

            onSliderUpdate = {(positions)=>{
                              this.props.changeFilterSetting({lookingForMin: this.computeLookingForPostFormat(5, positions)[0]})
                              this.props.changeFilterSetting({lookingForMax: this.computeLookingForPostFormat(5, positions)[1]})
                              this.updateSliderSettings('LOOKING_FOR', positions)

              }
            }

          />

          <FilterRow
            changeScrollState={this.changeScrollState}
            topLeftTitle={'I Am Interested In'}
            containsSliderLabels={true}
            sliderLabels={['Men', 'Both', 'Women']}
            thumbPositions={[this.props.prevSliderValues.INTERESTED_IN[0]]}
            sliderColor={'#EFDAC6'}
            hasSteps={true}
            numSteps={3}
            onSliderUpdate = {(positions)=>{
                              this.props.changeFilterSetting({interestedIn: this.computeStepPostFormat(3, positions)[0]})
                              this.updateSliderSettings('INTERESTED_IN', positions)
              }
            }
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
    prevFilters: state.previousFilters,
    prevSliderValues: state.prevSliderValues
  }
}

// Connects the state variables to the property variables within
// the home class
export default connect(mapStateToProps, mapDispatchToProps)(Filter);
