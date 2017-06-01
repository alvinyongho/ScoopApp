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
    this.props.fetchFilters()
  }

  computeInMiles = (sliderValue) => {
    return Math.floor(sliderValue * 200) + ' miles'
  }

  computeSliderToHeight = (sliderValues) => {
    let min = 36
    let max = 96

    inchesArray = sliderValues.map((sliderValue)=>{
      // console.log(
      return Math.floor(sliderValue*(max-min)+min)
    })

    ftInArray = this.inchesArrayToFtInArray(inchesArray)
    console.log(ftInArray)
    return ftInArray.sort().join(' - ')
  }

  inchesArrayToFtInArray = (inchesArray) => {
    return inchesArray.map((inches)=>{
      console.log(inches)
      ft = Math.floor(inches/12)
      inches = inches-(12*ft)
      return `${ft}'${inches}"`
    })
  }

  computeSliderToAgeRange = (sliderValues) => {
    let min = 18
    let max = 99

    ageArray = sliderValues.map((sliderValue)=>{
      return Math.floor((sliderValue*(max-min))+min)
    })
    return ageArray.sort().join(' - ') + ' years'
  }


  render() {
    return(
      <View style={{backgroundColor:'#E6E6E6'}}>
        <ScrollView scrollEnabled={this.state.isScrollEnabled} style={{height:screenHeight-110}}>

          <FilterRow
            changeScrollState={this.changeScrollState}
            topLeftTitle={'Search Radius'}
            containsSliderLabels={false}
            thumbPositions={[0]}
            sliderColor={'#ECA45C'}
            initialValue={'tbd'}
            hasSteps={false}
            sliderResultFunction={this.computeInMiles}
          />

          <FilterRow
            changeScrollState={this.changeScrollState}
            topLeftTitle={'Age Range'}
            containsSliderLabels={false}
            thumbPositions={[0,1]}
            sliderColor={'#ECA45C'}
            initialValue={'tbd'}
            hasSteps={false}
            sliderResultFunction={this.computeSliderToAgeRange}
          />

          <FilterRow
            changeScrollState={this.changeScrollState}
            topLeftTitle={'Height'}
            containsSliderLabels={false}
            thumbPositions={[0,1]}
            sliderColor={'#ECA45C'}
            initialValue={'tbd'}
            hasSteps={false}
            sliderResultFunction={this.computeSliderToHeight}
          />

          <FilterRow
            changeScrollState={this.changeScrollState}
            topLeftTitle={'I Am Looking For'}
            containsSliderLabels={true}
            sliderLabels={['Relationship', 'Friendship']}
            thumbPositions={[0,1]}
            sliderColor={'#ECA45C'}
            hasSteps={true}
            numSteps={5}
          />

          <FilterRow
            changeScrollState={this.changeScrollState}
            topLeftTitle={'I Am Interested In'}
            containsSliderLabels={true}
            sliderLabels={['Men', 'Both', 'Women']}
            thumbPositions={[0]}
            sliderColor={'#EFDAC6'}
            hasSteps={true}
            numSteps={3}
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
