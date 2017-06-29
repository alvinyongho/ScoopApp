import React, {Component} from 'react';
import {
  View, Text, ScrollView, Image
} from 'react-native';


import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/EvilIcons';

import { ActionCreators } from '../../actions';

// import ImportableGalleryCollectionView from '../PersonalProfile/ImportableGalleryCollectionView'

import Button from 'react-native-button';
import images from '@assets/images';

// import SettingsList from '../Settings/SettingsList'
import SaveButton from './SaveButton';
import NavBarLogo from '../NavigationBar/NavBarLogo'


export class PicturePreviewScreen extends React.Component {
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
    headerRight: <SaveButton />,
    headerStyle: {backgroundColor: '#54C9EC',},
    headerTitleStyle: {color: 'white', alignSelf:'center'}
  });

  componentWillMount(){
    const setParamsAction = NavigationActions.setParams({
      params: { hideTabBar: true },
      key: "MyProfile",
    });
    this.props.navigation.dispatch(setParamsAction);
  }

  componentDidMount(){
    this.props.GetImageToPreview()
  }

  componentWillUnmount(){
    const setParamsAction = NavigationActions.setParams({
      params: { hideTabBar: false },
      key: "MyProfile",
    });
    this.props.navigation.dispatch(setParamsAction);
    this.props.resetAlbumImagePreview();

  }

  render() {
    return(
      <View style={{flex: 1, backgroundColor:'black', justifyContent: 'center'}}>
        <Image source={{uri:this.props.albumDetails.albumToPreview}} style={{height: 300, backgroundColor: 'white'}} />
      </View>
    )
  }
}


function mapStateToProps(state){
  return {
    albumDetails: state.albumDetails


  }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(PicturePreviewScreen);
