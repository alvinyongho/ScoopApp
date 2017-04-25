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
} from 'react-native';

class MatchFeed extends Component{
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
      <View>
        <View>
          <TouchableHighlight onPress={() => this.searchMatches() }>
            <Text>Fetch Matches</Text>
          </TouchableHighlight>
        </View>
        <ScrollView>
          {this.matches().map(match => {
            return(
              <View key={match.id}>
                <Text>{match.name}</Text>
              </View>
            );
            })}
        </ScrollView>
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
export default connect(mapStateToProps)(MatchFeed);