import {getPictureUrlByPictureId } from '../../services/facebook';

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

  getPictureUrl = (imageId) =>{
    getPictureUrlByPictureId(imageId).then((image)=>{
      return image.picture
    })
  }

  constructor(props){
    super(props)
    this.state = ({
      myAlbumCovers: this.props.myAlbumCovers
    })
  }

  componentDidMount(){
    this.requestAlbumListAndImages()

  }

  requestAlbumListAndImages(){
    this.props.getAlbumCovers()
  }

  renderListOfAlbums(){
    if(!this.props.albumDetails.albumIds || !this.props.albumDetails.albumCoverURLs) return null

    return Object.keys(this.props.albumDetails.albumIds).map((index)=>{
      // console.log(this.state.myAlbumCovers[index].picture)
      return (
      <View key={index}>
        <TouchableHighlight underlayColor={'#DFDFDF'} onPress={()=>this.props.GoToAlbumContents(this.props.albumDetails.albumIds[index].id)}>
          <View style={{height:70, backgroundColor:'white', flex:1, flexDirection:'row', alignItems: 'center'}}>

            {this.props.albumDetails.albumCoverURLs[index] &&
            <Image source={{uri:this.props.albumDetails.albumCoverURLs[index]}} style={{margin: 5, width:60, height:60,}}/>
            }

            <View style={{justifyContent: 'center'}}><Text style={{fontSize:18, fontFamily:'Avenir-Light'}}> {this.props.albumDetails.albumIds[index].name} </Text></View>
            <View style={{flex: .1, justifyContent: 'center', alignItems: 'flex-end'}}><Icon name="chevron-right" size={30} color="#BBBBBB" /></View>
          </View>
        </TouchableHighlight>
        <RowDivider/>
      </View>
      )

    })




  }


  render(){
    return(
      <ScrollView style={{backgroundColor:'#DFDFDF'}}>
      {this.renderListOfAlbums()}

      </ScrollView>
    );
  }
}


// Match state to props which allows us to access actions
function mapStateToProps(state){
  return {
    albumDetails: state.albumDetails,
    // myAlbumCovers: state.myAlbumCovers,
    // myAlbumCoverUrls: state.myAlbumCoverUrls
  }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

// Connects the state variables to the property variables within
// the home class
export default connect(mapStateToProps, mapDispatchToProps)(ImportableAlbumListView);
