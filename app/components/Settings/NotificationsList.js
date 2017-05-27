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

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { NavigationActions } from 'react-navigation';


import SettingsRow from './SettingsRow'
import SettingsRowSpacer from './SettingsRowSpacer'
import RowDivider from '../Profile/ProfileTableRow/RowDivider'

export class NotificationsList extends React.Component {
  // _navigateTo(){
  //   console.log('navigate to destination')
  // }

  render(){
    return(
      <ScrollView style={{backgroundColor: '#E6E6E6'}}>

        <SettingsRow onClick={()=>console.log('todo')} rightComponent={'switch'} title="Messages"/>
        <RowDivider />
        <SettingsRow onClick={()=>console.log('todo')} rightComponent={'switch'} title="Matches"/>
        <RowDivider />


      </ScrollView>
    );
  }
}


// Match state to props which allows us to access actions
function mapStateToProps(state){
  return {
  }
}


const mapDispatchToProps = dispatch => ({

});


// Connects the state variables to the property variables within
// the home class
export default connect(mapStateToProps, mapDispatchToProps)(NotificationsList);
