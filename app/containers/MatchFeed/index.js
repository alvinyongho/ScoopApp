import React, {Component} from 'react';
import ReactNative from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';

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

import Swiper from 'react-native-page-swiper';
import images from '@assets/images';


const FB_EXPIRED_URL = 'https://scontent.xx.fbcdn.net';

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
    initialPosition: 'unknown',
    lastPosition: 'unknown',
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


  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  searchMatches() {
    // due to destruct in app container <Home {...this.props} all the actions
    // from the AppContainer get passed into the Home container
    this.props.fetchMatches(
      match_attributes =
        this.state.lastPosition
    )




  }

  matches(){
    return Object.keys(this.props.foundMatches)
      .map( key => this.props.foundMatches[key])
  }

  componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // var initialPosition = JSON.stringify(position);
        this.setState({initialPosition: position});
        this.props.fetchMatches(match_attributes=position)
      },
      (error) => alert(JSON.stringify(error)),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      // var lastPosition = JSON.stringify(position);
      this.setState({lastPosition: position});
    });


    this.props.fetchFilters()
    // this.searchMatches();



  }

  componentWillMount(){
    // this.searchMatches();
  }


  _renderImage = (match) => {
    if(match.image && !match.image.includes(FB_EXPIRED_URL)){
      // console.log(match.image)

      return(
        <Image style={{flex:1}} source={{uri:match.image}}>
          <Text style={styles.profileName}>{match.name}</Text>
          <Text style={styles.profileDescription}>{match.jobTitle}</Text>
        </Image>
      );
    }
    // Return a gray view image is missing
    return(
      <View style={{flex:1, backgroundColor:'gray'}}>
        <Text style={styles.profileName}>{match.name}</Text>
        <Text style={styles.profileDescription}>{match.description}</Text>
      </View>
    );
  }


  _onPressProfile = (matchId) => {
    // fire an action to perform the get user task of selected and set the state tree accordingly
    // populate the profile detail
    // console.log(`TODO: get user task of ${matchId}`)
    this.props.fetchUser(matchId)
    this.props.profile()
  };

  render(){
    return (
      <View>
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
          {/* Header */}
          <View style={{height: 7}} />

          {this.matches().map(match => {
            return(
              <View key={match.id}>

              <Swiper style={styles.wrapper} index={1} pager={false}>
                <View style={styles.interestedSlide}>
                  <Image source={images.interested} />
                </View>

                <View style={styles.profileSlide}>
                  <View style={{flex:1, marginTop: 7, marginBottom: 7, marginLeft:14, marginRight:14, backgroundColor: 'white', borderRadius: 5}}>
                    <TouchableHighlight onPress={() => this._onPressProfile(match.id)} style={{flex:1, margin: 15, justifyContent:'flex-end'}}>
                      {this._renderImage(match)}
                    </TouchableHighlight>
                  </View>
                </View>
                <View style={styles.notInterestedSlide}>
                  <Image source={images.notInterested} />
                </View>
              </Swiper>

              </View>
            );
            })}

            {/* Footer */}
            <View style={{height: 7}} />

        </ScrollView>
      </View>

    );
  }
}


const CELL_SIZE = 270

var styles = StyleSheet.create({
  wrapper: {
  },
  interestedSlide: {
    height: CELL_SIZE,
    justifyContent: 'center',
    alignItems: 'flex-end',
    // backgroundColor: '#9DD6EB',
  },
  profileSlide: {
    height: CELL_SIZE,
    flex:1
  },
  notInterestedSlide: {
    height: CELL_SIZE,

    justifyContent: 'center',
    alignItems: 'flex-start',
    // backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '100',
  },
  profileName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
    position: 'absolute',
    bottom: 27,
    left: 10,
  },
  profileDescription: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '300',
    position: 'absolute',
    bottom: 10,
    left: 10,
  }

})

// Match state to props which allows us to access actions
function mapStateToProps(state){
  return {
    foundMatches: state.foundMatches
  }
}


const mapDispatchToProps = dispatch => ({
  profile: () => dispatch(NavigationActions.navigate({ routeName: 'Profile' })),
});


// Connects the state variables to the property variables within
// the home class
export default connect(mapStateToProps, mapDispatchToProps)(MatchFeed);
