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
    this.props.getAlbumCovers()

  }

  requestAlbumListAndImages(){
    this.props.populateFacebookAlbums()
  }

  renderListOfAlbums(){
    if(!this.props.myAlbumCovers || !this.props.myAlbumCoverUrls) return null
    //
    // console.log("@@@@ RENDERING ALBUMS")
    // console.log(this.state.myAlbumCovers)
    return Object.keys(this.props.myAlbumCovers).map((index)=>{
      // console.log(this.state.myAlbumCovers[index].picture)
      return (
      <View key={index}>
        <TouchableHighlight underlayColor={'#DFDFDF'} onPress={()=>this.props.GoToAlbumContents(this.props.myAlbumCoverUrls[index].albumId)}>
          <View style={{height:70, backgroundColor:'white', flex:1, flexDirection:'row', alignItems: 'center'}}>

            {this.props.myAlbumCoverUrls[index] &&
            <Image source={{uri:this.props.myAlbumCoverUrls[index].coverURL}} style={{margin: 5, width:60, height:60,}}/>
            }

            <View style={{justifyContent: 'center'}}><Text style={{fontSize:18, fontFamily:'Avenir-Light'}}> {this.props.myAlbumCovers[index].albumName} </Text></View>
            <View style={{flex: .1, justifyContent: 'center', alignItems: 'flex-end'}}><Icon name="chevron-right" size={30} color="#BBBBBB" /></View>
          </View>
        </TouchableHighlight>
        <RowDivider/>
      </View>
      )

    })

    return null



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
    myAlbumCovers: state.myAlbumCovers,
    myAlbumCoverUrls: state.myAlbumCoverUrls
  }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

// Connects the state variables to the property variables within
// the home class
export default connect(mapStateToProps, mapDispatchToProps)(ImportableAlbumListView);
