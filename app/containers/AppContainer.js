import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';        // handles state and actions
import { ActionCreators } from '../actions'   // Retrieves all the action creators
import { bindActionCreators } from 'redux'


class AppContainer extends Component {
  constructor(props) {
    super(props);
  }


  addMatch(){
    this.props.addMatch(); //action creators and connect method are being pulled into the appcontainer component
  }

  render() {
    return(
    <View>
      <Text style={{marginTop: 20}}> Match count: {this.props.matchCount} </Text>
      <TouchableHighlight onPress={ () => { this.addMatch() }}>
        <Text>Add Match</Text>
      </TouchableHighlight>
    </View>
  );
  }
};


// maps action creator calls to a dispatch to update the state
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => {
  return {
    matchCount: state.matchCount
  }
}, mapDispatchToProps)(AppContainer);
