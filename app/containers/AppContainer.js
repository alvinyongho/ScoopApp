import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';        // handles state and actions
import { ActionCreators } from '../actions'   // Retrieves all the action creators
import { bindActionCreators } from 'redux'
import Home from './Home'

class AppContainer extends Component {
  constructor(props) {
    super(props);
  }


  addMatch(){
    this.props.addMatch(); //action creators and connect method are being pulled into the appcontainer component
  }

  render() {
    return(
      <Home {...this.props}/>
  );
  }
};


// maps action creator calls to a dispatch to update the state
// Bind actions (dispatcher) to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

// maps the state properties to this.props.____
// which is defined from the return value of the function in connect
export default connect((state) => { return {} }, mapDispatchToProps)(AppContainer);
