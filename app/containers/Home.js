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

  constructor(props){
    super(props)
    this.state = {
      scoopUserId: undefined
    }
  }
  componentDidMount(){


    this.props.initialLoginRegisterUserTaskCall()

    // this.props.getScoopUserIdAndToken()
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.scoopUserId != undefined){
      this.setState({scoopUserId:nextProps.scoopUserId})
    }
    // Retrieve after getScoopUserIdAndToken


    // this.nextProps.getScoopUserImages()
    // this.nextProps.getMyProfileInfo()
    // this.nextProps.retrieveEduExperience()
    // this.nextProps.getUnreadCount()
    // this.nextProps.getMessageList()
  }

  componentDidUpdate(prevProps, prevState){
    // If we have the scoop Id
    if(this.state.scoopUserId){
      this.props.getScoopUserImages()
      this.props.getMyProfileInfo()
      this.props.retrieveEduExperience()
      this.props.getUnreadCount()
      this.props.getMessageList()
    }


  }



  render(){
    /*
      By relying on state update we can call the render of the child component
      which by then should have the necessary information to call from the api
      to fetch the feed
    */
    if(this.state.scoopUserId){
      console.log("matchfeed getting rendered")
      return (
        <MatchFeed {...this.props}/>
      );
    }
    else return null
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
    // foundMatches: state.foundMatches,
    scoopUserProfile: state.scoopUserProfile,
    scoopUserId: state.scoopUserProfile.scoopId,
    userProfile: state.userProfile
  }
}

// Connects the state variables to the property variables within
// the home class
export default connect(mapStateToProps, mapDispatchToProps)(Home);
