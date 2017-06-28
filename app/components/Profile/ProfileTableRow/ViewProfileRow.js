import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../actions';
import { NavigationActions } from 'react-navigation';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight
} from 'react-native';

import Icon from 'react-native-vector-icons/EvilIcons';


export class ViewProfileRow extends Component {

  constructor(props){
    super(props)
  }

  render(){
    return (
      <TouchableHighlight onPress={()=>{
        this.props.fetchUser(this.props.scoopUserId)
        this.props.PreviewProfile()
        this.props.resetMessengerTab()
      }}
      >
        <View style={{padding: 10, paddingTop: 12, backgroundColor: 'white', flex: 1, flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontSize: 18, fontFamily: 'Avenir-Light', color:'#666666', flex:.5}}> View Profile </Text>

          <View style={{alignItems:'flex-end', justifyContent: 'flex-end', flex: .5}}>
            <Icon name="chevron-right" size={35} color="#BBBBBB" />
          </View>
        </View>
      </TouchableHighlight>
    );
  }

}

// Match state to props which allows us to access actions
function mapStateToProps(state){
  return {
    scoopUserId: state.scoopUserProfile.scoopId
  }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}


// Connects the state variables to the property variables within
// the home class
export default connect(mapStateToProps, mapDispatchToProps)(ViewProfileRow);
