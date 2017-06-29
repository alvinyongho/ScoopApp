import React, {Component} from 'react';
import {
  View, Text, WebView
} from 'react-native';



import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';

import Button from 'react-native-button';
import images from '@assets/images';

import SettingsList from '../Settings/SettingsList'
import Icon from 'react-native-vector-icons/EvilIcons';
import NavBarLogo from '../NavigationBar/NavBarLogo'



export class TOSScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: <NavBarLogo />,
    // TODO: Add Settings page
    headerLeft: <Button onPress={() => navigation.goBack()}>
                    <Icon name="chevron-left" size={50} color="white" />
                 </Button>,
    headerStyle: {backgroundColor: '#54C9EC',},
    headerTitleStyle: {color: 'white', alignSelf:'center'}
  });

  render() {
    return(
      <WebView
      source={{uri: 'http://www.scoopdating.com/terms-of-use/'}}
      />
    )
  }
}


const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
});


export default connect(mapStateToProps, mapDispatchToProps)(TOSScreen);
