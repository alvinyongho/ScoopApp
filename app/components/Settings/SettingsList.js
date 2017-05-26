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

import SettingsRow from './SettingsRow'
import SettingsRowSpacer from './SettingsRowSpacer'
import RowDivider from '../Profile/ProfileTableRow/RowDivider'

export default class SettingsList extends React.Component {
  render(){
    return(
      <ScrollView style={{backgroundColor: '#E6E6E6'}}>
        <SettingsRow rightComponent={'navigation'} title="Notifications"/>
        <RowDivider />
        <SettingsRow rightComponent={'navigation'} title="Privacy"/>
        <RowDivider />
        <SettingsRow rightComponent={'navigation'} title="Logout"/>
        <RowDivider />
        <SettingsRow rightComponent={'switch'} title="Hide Profile"/>
        <RowDivider />
        <SettingsRow rightComponent={'navigation'} title="Delete Account"/>
        <RowDivider />

        <SettingsRowSpacer />
        <SettingsRow rightComponent={'navigation'} title="Rate Scoop"/>
        <SettingsRowSpacer />

        <SettingsRow rightComponent={'navigation'} title="Private Policy"/>
        <RowDivider />
        <SettingsRow rightComponent={'navigation'} title="Terms of Service"/>
      </ScrollView>
    );
  }
}
