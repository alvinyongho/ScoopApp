import React, {Component} from 'react';
import {
  View, Text, ScrollView
} from 'react-native';


import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/EvilIcons';


import ImportableGalleryCollectionView from '../PersonalProfile/ImportableGalleryCollectionView'

import Button from 'react-native-button';
import images from '@assets/images';
import NavBarLogo from '../NavigationBar/NavBarLogo'

// import SettingsList from '../Settings/SettingsList'


export class ImportFromGalleryScreen extends React.Component {
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
      <ImportableGalleryCollectionView />
    )
  }
}


const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
});


export default connect(mapStateToProps, mapDispatchToProps)(ImportFromGalleryScreen);
