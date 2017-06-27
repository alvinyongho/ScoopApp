import React, {Component, PropTypes} from 'react'
import SectionTitle from './SectionTitle'
import ProfileSlider from './ProfileSlider'
import {View} from 'react-native'

export default class LookingForSection extends Component{
  computeThumbLocation(numSteps, thumbPosition){
    return (thumbPosition/(numSteps-1))
  }

  static propTypes = {
    updatedSection: PropTypes.func
  }

  static defaultProps = {
    updatedSection: () => {console.log("unimplemented update Section. Takes in 3 parameters. SectionTitle, SectionValue, NumSteps")},
  }

  handleRelease = (sectionTitle, sectionValue, numSteps) =>{
    if (!this.props.disabled){
      this.props.updatedSection(sectionTitle, sectionValue, numSteps)
    }
  }

  render(){
    const LOOKING_FOR_SECTION_0 = "lookingForType"
    const LOOKING_FOR_SECTION_1 = "lookingForGender"

    return(
      <View>
        <SectionTitle title={'LOOKING FOR'}/>
        <View style={{height: 15, backgroundColor: 'white'}}/>
        <ProfileSlider
          numSteps={3}
          hasSteps={true}
          disabled={this.props.disabled}
          leftLabel={'Relationship'}
          rightLabel={'Friendship'}
          onRelease={(released_pos)=>{this.handleRelease(LOOKING_FOR_SECTION_0, released_pos, 3)}}
          thumbLocation={this.computeThumbLocation(3, this.props.lookingForType-1)}
          changeScrollState={this.props.changeScrollState} />

        <View style={{height:1, backgroundColor:'#EFEFEF'}}/>
        <View style={{height: 15, backgroundColor: 'white'}}/>
        <ProfileSlider
          numSteps={3}
          disabled={this.props.disabled}
          hasSteps={true}
          leftLabel={'Men'}
          middleLabel={'Both'}
          rightLabel={'Women'}
          onRelease={(released_pos)=>{this.handleRelease(LOOKING_FOR_SECTION_1, released_pos, 3)}}
          thumbLocation={this.computeThumbLocation(3, this.props.lookingForGender-1)}
          changeScrollState={this.props.changeScrollState} />
      </View>
    )
  }
}
