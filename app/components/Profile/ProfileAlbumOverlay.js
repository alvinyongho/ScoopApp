import React, {Component} from 'react'

import {View, Dimensions, TouchableHighlight, Image} from 'react-native'
import Swiper from './react-native-page-swiper'



export default class ProfileAlbumOverlay extends Component{
  constructor(props){
    super(props)

  }

  closeAlbum(){
    this.props.closeAlbum()
  }

  componentDidMount(){
    console.log('PROPS')
    console.log(this.props)
  }

  profilePictures = () => {

    if(this.props.overlayImages.length){
      return pictureViews = this.props.overlayImages.map((imgsource, index) =>{
          if(imgsource){
            console.log(imgsource)
            return(
              <Image key={'albumPicture'+index} source={{uri:imgsource}} style={{backgroundColor: 'white', top: 100, height: 400, width: 100}}/>
            )
          }
      })

    }
    return <View />

  }


  render(){
    viewWidth =  Dimensions.get('window').width
    viewHeight = Dimensions.get('window').height
    circle_size = 25
    border_width = 3.0
    line_width = border_width
    circle_pad = 10

    return(
      <View style={{flex: 1, position: 'absolute', backgroundColor: 'black', flex: 1, height: viewHeight, width:viewWidth }}>
      <View style={{flex: 1, position: 'absolute', backgroundColor: 'black', flex: 1, height: viewHeight, width:viewWidth }} >

          <Swiper
            showsButtons={true}
            loop={false}
            onShortPress={()=>{}}
            onDragRelease={()=>{}}
            onDragStart={()=>{}}
          >
            {this.profilePictures()}
          </Swiper>

      </View>

      <TouchableHighlight onPress={()=>this.closeAlbum()}>
        <View style={{position: 'absolute', justifyContent: 'center', alignItems: 'center', width:28, height:28, top:33, left:10, backgroundColor: 'transparent', borderRadius: 14, borderWidth: 3, borderColor: 'white', zIndex:1}}>
          <View style={{position: 'absolute', height: line_width, width: circle_size-circle_pad, backgroundColor: 'white', transform: [{rotate: '45deg'}] }}/>
          <View style={{position: 'absolute', height: circle_size-circle_pad, width: line_width, backgroundColor: 'white', transform: [{rotate: '45deg'}] }}/>
        </View>
      </TouchableHighlight>
      </View>

    );
  }
}
