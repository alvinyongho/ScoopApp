import React, {Component} from 'react'

import {View, Dimensions, TouchableHighlight} from 'react-native'
import Swiper from './react-native-page-swiper'



export default class ProfileAlbumOverlay extends Component{
  constructor(props){
    super(props)

  }

  closeAlbum(){
    this.props.closeAlbum()
  }

  profilePictures = (pics) => {
    console.log(this.props)

    return <View/>
  }

  render(){
    viewWidth =  Dimensions.get('window').width
    viewHeight = Dimensions.get('window').height

    return(
      <View style={{flex: 1, position: 'absolute', backgroundColor: 'black', flex: 1, height: viewHeight, width:viewWidth }}>
        <TouchableHighlight onPress={()=>this.closeAlbum()}>
          <View style={{position: 'absolute', width:28, height:28, top:33, left:10, backgroundColor: 'white', borderRadius: 14}}>
      {/*      <Swiper
              showsButtons={true}
              loop={false}
              onShortPress={()=>{}}
              onDragRelease={()=>{}}
              onDragStart={()=>{}}
            >
              {this.profilePictures()}
            </Swiper>*/}

          </View>
        </TouchableHighlight>


      </View>

    );
  }
}
