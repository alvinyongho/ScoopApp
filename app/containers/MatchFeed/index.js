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
  Dimensions,
  // AppState
} from 'react-native';

import Swiper from '../../components/Profile/react-native-page-swiper';
import images from '@assets/images';

var {height, width} = Dimensions.get('window');

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
    lastPosition: 'unknown',
    isScrollEnabled: true,
    // appState: AppState.currentState,   // FOr handling when the app returns from background
    locationAccessibility: 'NOT_SET',  // For setting the error feedback if location cannot be accessed
    matchFeedLoadingStatus: 'NOT_SET'
  };


  _onRefresh = () => {
    if(this.state.lastPosition === 'unknown'){
      alert("the current location is unknown")
      return
    }

    this.setState({isRefreshing: true});
    // this.props.setFeedListStatus("LOADING")

    setTimeout(() => {
      this.retrieveMatches();
      this.setState({
        isRefreshing: false,
      });
    }, 3000);

  };

  componentWillMount(){
    this.getCurrentLocation()
  }

  retrieveMatches() {
    if(this.state.locationAccessibility === 'AVAILABLE'){
      this.props.fetchMatches()
    }
  }

  matches(){
    return Object.keys(this.props.foundMatches)
      .map( key => this.props.foundMatches[key])
  }

  componentDidMount(){
    //Handle if app goes to the background/foreground then we get the current location and fetch matches
    // AppState.addEventListener('change', this._handleAppStateChange);
  }

  //
  // _handleAppStateChange = (nextAppState) => {
  //   console.log("INSIDE HANDLE APP STATE CHANGE")
  //   console.log("INSIDE HANDLE APP STATE CHANGE")
  //
  //   console.log(nextAppState)
  //
  //   if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
  //     console.log("APP IS NOW ACTIVE AGAIN")
  //     this.getCurrentLocation()
  //   }
  //   this.setState({appState: nextAppState});
  // }


  getCurrentLocation = () => {
    // Gets the current location using the navigator api and sets the state
    this.watchID = navigator.geolocation.watchPosition(
      (position) => {

        console.log("GETTING THE CURRENT LOCATION")
        console.log(`longitude: ${position.coords.longitude}`)
        console.log(`latitude:  ${position.coords.latitude}`)


        this.setState({lastPosition: position.coords});
        this.setState({locationAccessibility: "AVAILABLE"})
        // Dispatch an action to set the current location
        this._setUserLocation(position.coords)
      },
      (error) => {
        switch(error.code){
          case 1:
            this.setState({locationAccessibility: "PERMISSION_NEEDED"})
            break
          case 2:
            this.setState({locationAccessibility: "LOCATION_UNAVAILABLE"})
            break
          case 3:
            this.setState({locationAccessibility: "LOCATION_UNAVAILABLE"})
            break
        }
        alert(JSON.stringify(error))
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  _setUserLocation(position){
    // Calls the action to update the state of the user's location
    this.props.updateCurrentLocation(position)
  }


  // Should we retrieve the matches?
  shouldComponentUpdate(nextProps, nextState){
    currLatSet = typeof nextProps.currentLocation.lat != undefined
    currLonSet = typeof nextProps.currentLocation.lon != undefined
    locationAccessable = nextState.locationAccessibility === 'AVAILABLE'
    canLoadFeed = (currLatSet && currLonSet && locationAccessable)

    if(this.props.currentLocation !== nextProps.currentLocation){
      console.log("location updated")
      if (canLoadFeed){
        this.retrieveMatches();
      }
    }

    if(this.state.matchFeedLoadingStatus !== nextProps.feedListStatus){
      this.setState({matchFeedLoadingStatus: nextProps.feedListStatus.matchLoadingStatus})
    }

    return true
  }


  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
    navigator.geolocation.clearWatch(this.watchID);
  }


  _renderImage = (match) => {
    if(match.image && !match.image.includes(FB_EXPIRED_URL)){
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

  changeScrollState = (scrollState) =>{
    this.setState({isScrollEnabled: scrollState})
  }

  // This function uses the pagination index to determine
  // whether the user swiped interested/not interested.
  // The 0 page index is a like. The 1 page index is a button that goes
  // to the user profile so it does not toggle the post action + feedlist state
  // update. The 2 page index is the not interested post action
  // The action dispatched should update the feed list.
  likeDislikeUser = (pageNum, userId) => {
    switch(pageNum){
      case 0:
        this.props.toggleUserLikesTarget(true, userId)
        break
      case 2:
        this.props.toggleUserLikesTarget(false, userId)
        break
      default:
        break
    }
  }

  render(){
    showLocationError = (this.state.locationAccessibility === 'PERMISSION_NEEDED' ||
                         this.state.locationAccessibility === 'LOCATION_UNAVAILABLE')
    showLoadingBar    = (this.state.matchFeedLoadingStatus === 'LOADING' ||
                         this.state.matchFeedLoadingStatus === 'NOT_SET')
    if(showLocationError){
      return(
        <View><Text>{this.state.locationAccessibility}</Text></View>
      )
    }

    if(showLoadingBar){
      console.log("SHOW LOADING INDICATOR")
      return(
        <View><Text>LOADING INDICATOR HERE</Text></View>
      )
    }

    return (
      <View>
        <ScrollView
          scrollEnabled={this.state.isScrollEnabled}
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
            // Because we don't delete the matches. we simply set it to
            // undefined due to performance issue with deleting is an O(n)
            // problem versus constant time.
            if(match == undefined) return

            return(
              <View key={match.id}>
                <Swiper
                  onDragRelease={() => this.changeScrollState(true)}
                  onDragStart={() => this.changeScrollState(false)}
                  onPageChange={(pageNum) => this.likeDislikeUser(pageNum, match.id)}
                  style={styles.wrapper} index={1} pager={false}>

                  <View style={styles.interestedSlide}>
                    <Image style={{right:20}} source={images.interested} />
                  </View>

                  <View style={styles.profileSlide}>
                    <View style={{flex:1, marginTop: 7, marginBottom: 7, marginLeft:14, marginRight:14, backgroundColor: 'white', borderRadius: 5}}>
                      <TouchableHighlight onPress={() => this._onPressProfile(match.id)} style={{flex:1, margin: 15, justifyContent:'flex-end'}}>
                        {this._renderImage(match)}
                      </TouchableHighlight>
                    </View>
                  </View>

                  <View
                    onDragRelease={() => this.changeScrollState(true)}
                    onDragStart={() => this.changeScrollState(false)}
                    onPageChange={(pageNum) => this.likeDislikeUser(pageNum, match.id)}
                    style={styles.notInterestedSlide}>
                    <Image style={{left:20}} source={images.notInterested} />
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
    foundMatches: state.foundMatches,
    currentLocation: state.currentLocation,
    feedListStatus: state.feedListStatus
  }
}


const mapDispatchToProps = dispatch => ({
  profile: () => dispatch(NavigationActions.navigate({ routeName: 'Profile' })),
});


// Connects the state variables to the property variables within
// the home class
export default connect(mapStateToProps, mapDispatchToProps)(MatchFeed);
