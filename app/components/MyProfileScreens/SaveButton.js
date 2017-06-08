import React, {Component} from 'react';
import {
  View, Text, ScrollView
} from 'react-native';


import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';
import Icon from 'react-native-vector-icons/EvilIcons';

import { ActionCreators } from '../../actions';

import Button from 'react-native-button';
import images from '@assets/images';

export class SaveButton extends React.Component{
  render(){
    return(
      <Button onPress={() => {this.props.saveMyPictureToPhotoAlbum()
                              // this.props.navigateToMyProfile()
                              // this.props.

                      }}>
                      <Text style={{
                         fontFamily:'Avenir-Light', marginRight: 15,
                         fontSize: 18, color:'white'}}>Save
                     </Text>
      </Button>
    );
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


export default connect(mapStateToProps, mapDispatchToProps)(SaveButton);
