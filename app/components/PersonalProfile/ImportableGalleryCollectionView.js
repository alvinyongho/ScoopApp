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
  componentDidMount(){
    this.props.getAlbumDetailImageURLs()
  }

  componentWillUnmount(){
    this.props.exitAlbumDetailActionCreator()
  }

  renderImagesGrid(){
    if(!this.props.albumDetails) return null

    return this.props.albumDetails.albumImages.map((imageURL, index)=>{
      return (
        <TouchableHighlight key={index} onPress={()=>this.props.navigateToPhotoPreviewScreen(this.props.albumImages[index])}>
          <Image source={{uri:imageURL}} style={{height:ScreenWidth/3, width: ScreenWidth/3, }}/>
        </TouchableHighlight>
      );
    })
  }

  render(){
    return(
      <ScrollView style={{backgroundColor:'#DFDFDF'}}>
        <View style={{flex:1, flexWrap: 'wrap', flexDirection:'row'}}>
          {this.renderImagesGrid()}

        </View>


      </ScrollView>
    );
  }
}


// Match state to props which allows us to access actions
function mapStateToProps(state){
  return {
    albumDetails: state.albumDetails,
    albumImages: state.myAlbumImages
  }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

// Connects the state variables to the property variables within
// the home class
export default connect(mapStateToProps, mapDispatchToProps)(ImportableGalleryCollectionView);
