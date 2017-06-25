import React, {Component, PropTypes} from 'react'
import SectionTitle from './SectionTitle'
import ProfileSlider from './ProfileSlider'
import {View} from 'react-native'

export default class LookingForSection extends Component{
  computeThumbLocation(numSteps, thumbPosition){
    return (thumbPosition/(numSteps-1))
  }


  static propTypes = {
    updateSection: PropTypes.func
  }

  static defaultProps = {
    updateSection: () => {console.log("unimplemented update Section")},
  }

  handleRelease = (sectionTitle, sectionValue) =>{
    if (!this.props.disabled){
      this.props.updateSection(sectionTitle, sectionValue)
    }
  }

  render(){
    const LOOKING_FOR_SECTION_0 = "lookingForType"
    const LOOKING_FOR_SECTION_1 = "lookingForGender"

    return(
      <View>
        <SectionTitle title={'LOOKING FOR'}/>
        <ProfileSlider
          numSteps={3}
          hasSteps={true}
          disabled={this.props.disabled}
          leftLabel={'Relationship'}
          rightLabel={'Friendship'}
          onRelease={(released_pos)=>{this.handleRelease(LOOKING_FOR_SECTION_0, released_pos)}}
          thumbLocation={this.computeThumbLocation(3, this.props.lookingForType-1)}
          changeScrollState={this.props.changeScrollState} />

        <View style={{height:1, backgroundColor:'gray'}}/>
        <ProfileSlider
          numSteps={3}
          disabled={this.props.disabled}
          hasSteps={true}
          leftLabel={'Men'}
          middleLabel={'Both'}
          rightLabel={'Women'}
          onRelease={(released_pos)=>{this.handleRelease(LOOKING_FOR_SECTION_1, released_pos)}}
          thumbLocation={this.computeThumbLocation(3, this.props.lookingForGender-1)}
          changeScrollState={this.props.changeScrollState} />
      </View>
    )
  }
}
