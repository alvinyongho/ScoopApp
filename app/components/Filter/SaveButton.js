import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
  Slider,
  Platform,
  Image
} from 'react-native';

// import NavigationBar from '../components/NavigationBar';
// To Pass dispatching actions to containers
import { connect } from 'react-redux';        // handles state and actions
import { ActionCreators } from '../../actions';   // Retrieves all the action creators
import { bindActionCreators } from 'redux';

import Button from 'react-native-button';


class SaveButton extends Component{
  _saveAndCallback(){
    this.props.saveFilters()


    // this.props.updatePrevFilters()

    this.props.reloadMatches()
    this.props.onSavePressed()
  }

  render() {

    return(
      <Button onPress={() => this._saveAndCallback() }
                 style={{fontSize: 20, color: 'white', fontFamily:'Avenir-Light'}}>
               <Text style={{marginRight: 20,
                 fontFamily:'Avenir-Light',
                 fontSize: 18, color:'white'}}>
                 Save
               </Text>
      </Button>
    );
  }
}



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
export default connect(mapStateToProps, mapDispatchToProps)(SaveButton);
