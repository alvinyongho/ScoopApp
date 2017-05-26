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
        <SettingsRow title="Notifications"/>
        <RowDivider />
        <SettingsRow title="Privacy"/>
        <RowDivider />
        <SettingsRow title="Logout"/>
        <RowDivider />
        <SettingsRow rightComponent={'switch'} title="Hide Profile"/>
        <RowDivider />
        <SettingsRow title="Delete Account"/>
        <RowDivider />

        <SettingsRowSpacer />
        <SettingsRow title="Rate Scoop"/>
        <SettingsRowSpacer />

        <SettingsRow title="Private Policy"/>
        <RowDivider />
        <SettingsRow title="Terms of Service"/>
      </ScrollView>
    );
  }
}
