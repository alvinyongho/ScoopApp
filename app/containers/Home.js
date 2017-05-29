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

// To Pass dispatching actions to containers
import { connect } from 'react-redux';        // handles state and actions
import { ActionCreators } from '../actions';   // Retrieves all the action creators
import { bindActionCreators } from 'redux';

import MatchFeed from './MatchFeed'



class Home extends Component{

  render(){
    return (
      <MatchFeed {...this.props}/>
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
    foundMatches: state.foundMatches
  }
}

// Connects the state variables to the property variables within
// the home class
export default connect(mapStateToProps, mapDispatchToProps)(Home);
