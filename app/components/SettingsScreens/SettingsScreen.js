import React, {Component} from 'react';
import {
  View, Text
} from 'react-native';


import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';

import Button from 'react-native-button';
import images from '@assets/images';

import SettingsList from '../Settings/SettingsList'
import Icon from 'react-native-vector-icons/EvilIcons';
import NavBarLogo from '../NavigationBar/NavBarLogo'


export class SettingsScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: <NavBarLogo />,
    // TODO: Add Settings page
    headerLeft: <Button onPress={() => navigation.goBack()}>
                    <Icon name="chevron-left" size={50} color="white" />
                    <Text style={{
                       fontFamily:'Avenir-Light', marginLeft: -15,
                       fontSize: 18, color:'white'}}>Back
                   </Text>
                 </Button>,
    headerStyle: {backgroundColor: '#54C9EC',},
    headerTitleStyle: {color: 'white', alignSelf:'center'}
  });

  render() {
    return(
        <SettingsList />
    )
  }
}


const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
});


export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
