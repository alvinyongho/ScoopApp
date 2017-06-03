import React, {Component} from 'react'
import SectionTitle from './SectionTitle'
import ProfileSlider from './ProfileSlider'
import {View} from 'react-native'

export default class LookingForSection extends Component{
  computeThumbLocation(numSteps, thumbPosition){
    return (thumbPosition/(numSteps-1))
  }

  render(){
    return(
      <View>
        <SectionTitle title={'LOOKING FOR'}/>
      <ProfileSlider
        numSteps={5}
        hasSteps={true}
        disabled={true}
        leftLabel={'Relationship'}
        rightLabel={'Friendship'}
        thumbLocation={this.computeThumbLocation(5, this.props.lookingForType-1)}
        changeScrollState={this.props.changeScrollState} />

      <View style={{height:1, backgroundColor:'gray'}}/>
      <ProfileSlider
        numSteps={3}
        disabled={true}
        hasSteps={true}
        leftLabel={'Men'}
        middleLabel={'Both'}
        rightLabel={'Women'}
        thumbLocation={this.computeThumbLocation(3, this.props.lookingForGender-1)}
        changeScrollState={this.props.changeScrollState} />
      </View>
    )
  }
}
