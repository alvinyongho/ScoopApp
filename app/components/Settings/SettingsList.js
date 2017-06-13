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

export class SettingsList extends React.Component {
  // _navigateTo(){
  //   console.log('navigate to destination')
  // }

  constructor(props){
    super(props)
    this.state = ({
      privacyValue: true  // TODO: set to prop
    })
  }


  updatePrivacyState(value){
    this.setState({privacyValue: value})

    this.props.updatePrivacyState(value)

  }

  render(){
    return(
      <ScrollView style={{backgroundColor: '#E6E6E6'}}>
        <SettingsRow onClick={this.props.GoToSettingsNotifications} rightComponent={'navigation'} title="Notifications"/>
        <RowDivider />
        <SettingsRow onClick={this.props.GoToSettingsPrivacy} rightComponent={'navigation'} title="Privacy"/>
        <RowDivider />
        <SettingsRow onClick={() => this.props.facebookLogout()} rightComponent={'navigation'} title="Logout"/>
        <RowDivider />



        <SettingsRow
          switchValue={this.state.privacyValue}
          onClick={(switchValue)=>this.updatePrivacyState(switchValue)} rightComponent={'switch'} title="Hide Profile"/>


        <RowDivider />



        <SettingsRow onClick={()=>this.props.GoToSettingsDeleteAccount} rightComponent={'navigation'} title="Delete Account"/>
        <RowDivider />

        <SettingsRowSpacer />
        <SettingsRow onClick={()=>console.log('todo')} rightComponent={'navigation'} title="Rate Scoop"/>
        <SettingsRowSpacer />

        <SettingsRow onClick={this.props.GoToSettingsPrivacyPolicy} rightComponent={'navigation'} title="Private Policy"/>
        <RowDivider />
        <SettingsRow onClick={this.props.GoToSettingsTOS} rightComponent={'navigation'} title="Terms of Service"/>
      </ScrollView>
    );
  }
}


// Match state to props which allows us to access actions
function mapStateToProps(state){
  return {
  }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}



// Connects the state variables to the property variables within
// the home class
export default connect(mapStateToProps, mapDispatchToProps)(SettingsList);
