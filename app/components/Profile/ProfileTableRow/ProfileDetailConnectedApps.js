import React, {Component} from 'react'
import SectionTitle from './SectionTitle'
import ProfileSlider from './ProfileSlider'
import {View, Image, Text, StyleSheet} from 'react-native'
import images from '@assets/images';


export default class ProfileDetailConnectedApps extends Component{
  computeThumbLocation(numSteps, thumbPosition){
    return (thumbPosition/(numSteps-1))
  }

  componentDidMount(){
    console.log('LOOKING FOR SECTION')
  }


  _renderAvailImages = () => {
    let availAppIDs = this.props.connectedAppInts
    return (
      <View style={styles.availAppsBox}>
      {availAppIDs.includes("1")?
        <Image source={images.facebook_withColor} style={styles.availAppsImage}/>
      : <Image source={images.facebook_noColor} style={styles.availAppsImage}/>
      }
      {availAppIDs.includes("2")?
        <Image source={images.fitbit_withColor} style={styles.availAppsImage}/>
      : <Image source={images.fitbit_noColor} style={styles.availAppsImage}/>
      }
      {availAppIDs.includes("3")?
        <Image source={images.pinterest_withColor} style={styles.availAppsImage}/>
      : <Image source={images.pinterest_noColor} style={styles.availAppsImage}/>
      }
      {availAppIDs.includes("4")?
        <Image source={images.spotify_withColor} style={styles.availAppsImage}/>
      : <Image source={images.spotify_noColor} style={styles.availAppsImage}/>
      }
      </View>

    )
  }

  render(){
    return(
      <View>
        <SectionTitle title={'CONNECTED APPS'}/>
        <View style={styles.connectedAppsContainer}>
            {this._renderAvailImages()}

          <View style={{height:1, backgroundColor:'#E6E6E6'}} />

          <View style={styles.unavailAppsBox}>
            <Text style={{fontSize: 16, fontFamily: 'Avenir-Light'}}>Coming Soon:</Text>
              <Image source={images.instagram_noColor} style={styles.unavailAppsImage}/>
              <Image source={images.youtube_noColor} style={styles.unavailAppsImage}/>
              <Image source={images.foursqure_noColor} style={styles.unavailAppsImage}/>
              <Image source={images.twitter_noColor} style={styles.unavailAppsImage}/>
              <Image source={images.linkedin_noColor} style={styles.unavailAppsImage}/>

          </View>
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  footer:{
    height: 25, backgroundColor: '#E6E6E6'
  },
  connectedAppsContainer:{backgroundColor:'white', paddingLeft: 15},
  availAppsBox:{justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row'},
  availAppsImage:{height:50, width:50, margin: 15, marginLeft: 0, marginRight: 15, borderRadius: 50/2},
  unavailAppsBox:{height: 40, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row'},
  unavailAppsImage: { marginLeft:5, marginRight: 5,  height: 20, width:20, borderRadius: 20/2},


});
