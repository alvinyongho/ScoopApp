import React, {Component} from 'react'
import SectionTitle from './SectionTitle'
import ProfileSlider from './ProfileSlider'
import {View, Text, ScrollView, Image} from 'react-native'
import images from '@assets/images';


export default class InterestsSection extends Component{

  componentDidMount(){


  }


  _renderInterests(){
    profileLikes = this.props.profileLikes

    if(profileLikes){
    return interests = profileLikes.map((item, key)=>{
      // console.log(item)
      return(
        <View key={'profileLike'+key} style={{marginLeft:5, marginRight: 5, height:120, width:90, flexDirection: 'column'}}>
          <View style={{flex:.75, alignItems:'center', justifyContent: 'center'}}>

            {item.picURL &&
            <Image source={{uri:item.picURL}} style={{width: 65, height: 65, borderRadius: 65/2}} />
            }

            <View style={{position: 'absolute',top:5, left:5, width:23, height: 23, backgroundColor: 'white', borderRadius: 23/2, alignItems: 'center', justifyContent: 'center'}}>
              <Image source={images.facebook_withColor} style={{width:20, height: 20, borderRadius: 20/2}} />
            </View>
          </View>
          <View style={{flex:.25, alignItems: 'center'}}>
            <Text numberOfLines={1} style={{fontSize: 14, fontFamily: 'Avenir-Light'}}>{item.title}</Text>
          </View>
        </View>
      )
    })
    }
    else return null
  }

  render(){
    return(
      <View>
        <SectionTitle title={'THEIR INTERESTS'}/>
        <View style={{height: 120, backgroundColor: 'white', justifyContent: 'center'}}>
          <ScrollView horizontal={true}>
          <View style={{justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row'}}>

            {this._renderInterests()}


          </View>
          </ScrollView>
        </View>
      </View>
    )
  }
}
