import React, {Component} from 'react';
import ReactNative from 'react-native';
import { connect } from 'react-redux';
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableHighlight,
  RefreshControl,
  StyleSheet,
  Button,
} from 'react-native';

import Swipeout from 'react-native-swipeout'


var rightBtns = [
  {
    text: 'Button'
  }
]
var leftBtns = [
  {
    text: 'Button'
  }
]


class MatchFeed extends Component{

  state = {
    isRefreshing: false,
  };

  _onRefresh = () => {
    this.setState({isRefreshing: true});
    setTimeout(() => {
      // prepend 10 items
      this.searchMatches();

      this.setState({
        isRefreshing: false,
      });
    }, 3000);
  };

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
        {/*
        <View>
          <TouchableHighlight onPress={() => this.searchMatches() }>
            <Text>Fetch Matches</Text>
          </TouchableHighlight>

        </View>
        */}
        <ScrollView
          refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh}
            tintColor='#D1D1D1'
            title='loading...'
            titleColor="#D1D1D1"
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#ffff00"
          />
        }>
          {this.matches().map(match => {
            return(
              <View key={match.id} style={{margin: 0, marginBottom:0}}>

                <Swipeout right={rightBtns} left={leftBtns} style={{backgroundColor:'transparent'}}>
                  <View style={{margin: 15, padding: 10, borderRadius:5, backgroundColor: 'white'}}>
                    <View style={{flex:1, alignItems:'flex-start',
        justifyContent:'flex-end', height:200, margin:2, backgroundColor: 'gray'}}>
                      <Text style={{color:'white', margin:10}}>{match.name}</Text>
                    </View>
                  </View>
                </Swipeout>


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
