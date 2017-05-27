

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
  Dimensions
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/EvilIcons';


import SettingsRow from '../Settings/SettingsRow'
import SettingsRowSpacer from '../Settings/SettingsRowSpacer'
import RowDivider from '../Profile/ProfileTableRow/RowDivider'


const ScreenWidth = Dimensions.get('window').width


export class ImportableGalleryCollectionView extends React.Component {
  // _navigateTo(){
  //   console.log('navigate to destination')
  // }

  render(){
    return(
      <ScrollView style={{backgroundColor:'#DFDFDF'}}>
        <View style={{flex:1, flexWrap: 'wrap', flexDirection:'row'}}>
          <TouchableHighlight onPress={()=>console.log("todo")}>
            <View style={{height:ScreenWidth/3, width: ScreenWidth/3, backgroundColor: 'orange'}}/>
          </TouchableHighlight>


          <View style={{height:ScreenWidth/3, width: ScreenWidth/3, backgroundColor: 'red'}}/>
          <View style={{height:ScreenWidth/3, width: ScreenWidth/3, backgroundColor: 'green'}}/>
          <View style={{height:ScreenWidth/3, width: ScreenWidth/3, backgroundColor: 'purple'}}/>
          <View style={{height:ScreenWidth/3, width: ScreenWidth/3, backgroundColor: 'cyan'}}/>


        </View>


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
export default connect(mapStateToProps, mapDispatchToProps)(ImportableGalleryCollectionView);
