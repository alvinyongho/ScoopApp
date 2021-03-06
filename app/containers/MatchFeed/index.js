import React, {Component} from 'react';
import ReactNative from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';

import { resetMyProfileNav } from '../../actions/personalProfile'

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
  AppState
} from 'react-native';

import images from '@assets/images';
import Spinner from 'react-native-spinkit';
import LinearGradient from 'react-native-linear-gradient';

import FeedListRow from './FeedListRow'

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

  constructor(props){
    super(props)

    this.isScrollEnabled = true
    this.state = {
      isRefreshing: false,
      lastPosition: 'unknown',
      isScrollEnabled: true,
      appState: AppState.currentState,
      locationAccessibility: 'NOT_SET',  // For setting the error feedback if location cannot be accessed
      matchFeedLoadingStatus: 'NOT_SET',
      disableFeedSwipe: false,

    };

  }



  _onRefresh = () => {
    if(this.state.lastPosition === 'unknown'){
      alert("the current location is unknown")
      return
    }

    this.getCurrentLocation()
    this.setState({isRefreshing: true});
    this.retrieveMatches();

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
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!')
      // this.getCurrentLocation()
      // this.retrieveMatches()
      // If the current location is changed then we will update the component by retrieving matches
    }
    this.setState({appState: nextAppState});
  }


  getCurrentLocation = () => {
    // Gets the current location using the navigator api and sets the state
    this.watchID = navigator.geolocation.getCurrentPosition(
      (position) => {

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
            this.setState({locationAccessibility: "LOCATION_TIMEOUT"})
            break
          case 3:
            this.setState({locationAccessibility: "LOCATION_UNAVAILABLE"})
            break
        }
        // alert(JSON.stringify(error))
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 1000}
    );
  }

  _setUserLocation(position){
    // Calls the action to update the state of the user's location
    this.props.updateCurrentLocation(position)
  }

  // Should we retrieve the matches?
  componentWillReceiveProps(nextProps){
    if(nextProps.feedListStatus.matchLoadingStatus === "SUCCESS"){
      this.setState({isRefreshing: false})
    }

    currLatSet = typeof nextProps.currentLocation.lat != undefined
    currLonSet = typeof nextProps.currentLocation.lon != undefined
    locationAccessable = this.state.locationAccessibility === 'AVAILABLE'
    canLoadFeed = (currLatSet && currLonSet && locationAccessable)

    currLoc = this.props.currentLocation
    nextLoc = nextProps.currentLocation

    if((currLoc) !== (nextLoc)){
      if (canLoadFeed){
        this.retrieveMatches();
      }
    }

    // Syncronize the view state of the match feed with the feedList status
    if(this.state.matchFeedLoadingStatus !== nextProps.feedListStatus){
      this.setState({matchFeedLoadingStatus: nextProps.feedListStatus.matchLoadingStatus})
    }
  }


  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
    navigator.geolocation.clearWatch(this.watchID);
  }


  _renderDescription = (match) => {
    return (
      <View style={styles.profileTextBox}>
        <Text style={styles.profileName}>{match.name}</Text>
        <Text style={styles.profileDescription}>{match.jobTitle}</Text>
      </View>
    )
  }


  _renderImage = (match) => {
    if(match.image && !match.image.includes(FB_EXPIRED_URL)){
      return(
        <Image style={{flex:1}} source={{uri:match.image}}>
          <LinearGradient start={{x:.35, y:.35}} colors={['rgba(0,0,0,0)', '#000000']} style={{flex:.5, opacity:.8}} />
          { this._renderDescription(match) }
        </Image>
      );
    }
    // Return a gray view image is missing


    if(match.image.includes("fbcdn")){
      return(
          <Image resizeMode='contain' source={images.male_placeholder} style={{backgroundColor:'#A5A5A5', width: Dimensions.get('window').width-60, height: 225}}>
            { this._renderDescription(match) }
          </Image>
        );
    }



    // if(match.gender==="MALE"){
    //   return(
    //     <Image resizeMode='contain' source={images.male_placeholder} style={{backgroundColor:'#A5A5A5', width: 318, height: 225}}>
    //       { this._renderDescription(match) }
    //     </Image>
    //   );
    // }
    // if(match.gender==="FEMALE"){
    //   return(
    //     <Image resizeMode='contain' source={images.female_placeholder} style={{backgroundColor:'#A5A5A5', width: 318, height: 225}}>
    //       { this._renderDescription(match) }
    //     </Image>
    //   );
    // }



    return(


      <View style={{flex:1, backgroundColor:'gray'}}>
        { this._renderDescription(match) }
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
    this.isScrollEnabled = scrollState
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

  _renderSpinner = () =>{return (<View style={{flex: 1,
              alignItems:'center',
              justifyContent: 'center'}}>
              <Spinner type={'Arc'} color="skyblue"/>
          </View>);}

  handleScroll = (e:Object) =>{
    console.log('handling scroll')
    console.log(e.nativeEvent.contentOffset.y)
    this.setState({lastScrollYPosition: e.nativeEvent.contentOffset.y})
  }

  setScrollEnabled(enable) {
    this._listView.setNativeProps({scrollEnabled: enable});
  }

  setRefs(ref) {
      this._listView = ref;
  // this.props.listViewRef && this.props.listViewRef(ref);
  }

  render(){
    showLocationError = (this.state.locationAccessibility === 'PERMISSION_NEEDED' ||
                         this.state.locationAccessibility === 'LOCATION_UNAVAILABLE' ||
                         this.state.locationAccessibility === 'LOCATION_TIMEOUT')
    showLoadingBar    = (this.state.matchFeedLoadingStatus !== 'SUCCESS')

    loc_timeout = (this.state.locationAccessibility === 'LOCATION_TIMEOUT')

    if(loc_timeout)
      return this._renderSpinner()
    if(showLocationError)
      return <View><Text>{this.state.locationAccessibility}</Text></View>
    if(showLoadingBar)
      return this._renderSpinner()




    // if(this.state.matchFeedLoadingStatus === 'SUCCESS')
    return (
      <View style={{flex: 1, height: height-100}}>
        <ScrollView
          ref={ c => this.setRefs(c) }
          // scrollEnabled={this.state.isScrollEnabled}
          onScrollBeginDrag={()=>this.setState({disableFeedSwipe: true})}
          onScrollEndDrag={()=>this.setState({disableFeedSwipe: false})}
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

          {this.matches().length === 0 &&
            <View style={{margin: 50}}>
              <View style={{alignItems:'center'}}>
                <Text style={{fontFamily: 'Avenir-Light', fontSize: 16, textAlign:'center'}}>{`No users found for Filters`}</Text>
                <TouchableHighlight underlayColor='transparent' onPress={()=>this.props.goToFilter()}>
                  <View style={{alignItems: 'center', justifyContent: 'center', height: 35, width: 260, marginTop: 10, marginBottom: 10, borderRadius: 3, backgroundColor: '#54C9EC'}}>
                    <Text style={{fontFamily: 'Avenir-Light', fontSize: 16, color: 'white'}}> Change Filters </Text>
                  </View>
                </TouchableHighlight>
              </View>

              <View style={{alignItems:'center', marginTop: 20}}>
                <Text style={{fontFamily: 'Avenir-Light', fontSize: 16, textAlign:'center'}}>{`We're new, help us grow by sharing Scoop with your friends!`}</Text>
                <TouchableHighlight underlayColor='transparent' onPress={()=>console.log('TODO')}>
                <View style={{alignItems: 'center', justifyContent: 'center', height: 35, width: 260, marginTop: 10, marginBottom: 10, borderRadius: 3, backgroundColor: '#54C9EC'}}>
                <Text style={{fontFamily: 'Avenir-Light', fontSize: 16, color: 'white'}}> Share Scoop </Text>
                </View>
                </TouchableHighlight>
              </View>
            </View>
          }

          {this.matches().map(match => {
            // Because we don't delete the matches. we simply set it to
            // undefined due to performance issue with deleting is an O(n)
            // problem versus constant time.
            if(match == undefined) return

            return(
              <View key={match.id}>

                <FeedListRow
                            changeScrollState={this.changeScrollState}
                             likeDislikeUser={this.likeDislikeUser}
                             _onPressProfile={this._onPressProfile}
                             _renderImage={this._renderImage}
                             match={match}
                             feedListScrollViewDisabled={this.state.disableFeedSwipe}

                             setScrollEnabled={ (enable) => this.setScrollEnabled(enable) }


                             />

              </View>
            );
            })}

            {/* Footer */}
            <View style={{height: 7}} />

        </ScrollView>
      </View>
    );

    // return <View><Text>An unknown error occured.</Text></View>
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
    backgroundColor: 'transparent'
  },
  profileDescription: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '300',
    backgroundColor: 'transparent'
  },
  profileTextBox: {
    position:'absolute',
    bottom: 10,
    margin: 10,
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
  profile: () => {dispatch(NavigationActions.navigate({ routeName: 'Profile' }))
                  dispatch(resetMyProfileNav())
                  },
  goToFilter: () => { dispatch(NavigationActions.navigate({routeName: 'Filter'}))},
});


// Connects the state variables to the property variables within
// the home class
export default connect(mapStateToProps, mapDispatchToProps)(MatchFeed);
