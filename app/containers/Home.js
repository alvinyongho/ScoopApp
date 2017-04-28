import React, {Component} from 'react';
import ReactNative from 'react-native';
import { connect } from 'react-redux';
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

import { Link } from 'react-router-native'
import MatchFeed from './MatchFeed'

class Home extends Component{
  searchMatches() {
    // due to destruct in app container <Home {...this.props} all the actions
    // from the AppContainer get passed into the Home container
    this.props.fetchMatches(
      match_attributes =
        {
          'attribute1': 'criteria1',
          'atrribute2': 'criteria2',
        }
    )
  }

  onLogoutPressed(){
    this.props.facebookLogout();
  }

  matches(){
    return Object.keys(this.props.foundMatches)
      .map( key => this.props.foundMatches[key])
  }

  componentWillMount(){
    this.searchMatches();
  }

  render(){
    return (
      <View style={{margin: 20}}>
        <Link to="/filter">
          <Text> to filter</Text>
        </Link>

        <MatchFeed {...this.props}/>
        <Button title="Logout of Facebook" onPress={() => this.onLogoutPressed()} />

        <Link to="/test">
          <Text> TEst</Text>
        </Link>
      </View>
    );
  }
}

// Match state to props which allows us to access actions
function mapStateToProps(state){
  return {
    foundMatches: state.foundMatches
  }
}


// Connects the state variables to the property variables within
// the home class
export default connect(mapStateToProps)(Home);
