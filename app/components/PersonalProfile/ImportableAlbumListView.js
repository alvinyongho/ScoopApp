

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
import Icon from 'react-native-vector-icons/EvilIcons';


import SettingsRow from '../Settings/SettingsRow'
import SettingsRowSpacer from '../Settings/SettingsRowSpacer'
import RowDivider from '../Profile/ProfileTableRow/RowDivider'

export class ImportableAlbumListView extends React.Component {
  // _navigateTo(){
  //   console.log('navigate to destination')
  // }

  render(){
    return(
      <ScrollView style={{backgroundColor:'#DFDFDF'}}>

        <TouchableHighlight underlayColor={'#DFDFDF'} onPress={()=>this.props.GoToAlbumContents()}>
          <View style={{height:70, backgroundColor:'white', flex:1, flexDirection:'row', alignItems: 'center'}}>
            <View style={{margin: 5, width:60, height:60, backgroundColor: 'red'}}></View>
            <View style={{justifyContent: 'center'}}><Text style={{fontSize:18, fontFamily:'Avenir-Light'}}> Album Name Here </Text></View>
            <View style={{flex: .1, justifyContent: 'center', alignItems: 'flex-end'}}><Icon name="chevron-right" size={30} color="#BBBBBB" /></View>
          </View>
        </TouchableHighlight>
        <RowDivider/>

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
  GoToAlbumContents: (key) => dispatch(NavigationActions.navigate({ routeName:'AlbumContents' })),

});


// Connects the state variables to the property variables within
// the home class
export default connect(mapStateToProps, mapDispatchToProps)(ImportableAlbumListView);
