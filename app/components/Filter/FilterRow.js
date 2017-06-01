import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import MultiSlider from './MultiSlider'


const leftRightMargin = 20

export default class FilterItem extends Component{
  constructor(props){
    super(props)
    this.state = {
      sliderResult: '',
    };
  }

  createThumbs(positions){
    // let positions = [0, 1]
    return positions.map((value)=>{
      return {initialPosition: value}
    })
  }

  topLabels = () => {
    return(
      <View style={{flex:1, marginTop: leftRightMargin-2, marginBottom: leftRightMargin-2,  margin: leftRightMargin+3, flexDirection: 'row'}}>
        <View style={{flex:.5}}>
          <Text style={{textAlign: 'left', fontFamily:'Avenir-Light', fontSize:16}}>{this.props.topLeftTitle}</Text>
        </View>
        <View style={{flex:.5}}>
          <Text style={{textAlign:'right'}}>{this.state.sliderResult}</Text>
        </View>
      </View>
    )
  }


  sliderLabels = (labels) => {
    if (labels.length === 2){
      return labels.map((value, key) => {
        if(key === 0){
          return(
            <View key={'sliderLabel'+key} style={{flex:1}}>
              <Text style={{textAlign: 'left'}}>{value}</Text>
            </View>
          )
        }
        if(key === labels.length-1){
          return(
            <View key={'sliderLabel'+key} style={{flex:1}}>
              <Text style={{textAlign: 'right'}}>{value}</Text>
            </View>
          )
        }
      })
    }

    if (labels.length === 3){
      return labels.map((value, key) => {
        if(key === 0){
          return(
            <View key={'sliderLabel'+key} style={{flex:1}}>
              <Text style={{textAlign: 'left'}}>{value}</Text>
            </View>
          )
        }
        if(key === labels.length-1){
          return(
            <View key={'sliderLabel'+key} style={{flex:1}}>
              <Text style={{textAlign: 'right'}}>{value}</Text>
            </View>
          )
        }
        return(
          <View key={'sliderLabel'+key} style={{flex:1}}>
            <Text style={{textAlign: 'center'}}>{value}</Text>
          </View>
        )
      })
    }

  }

  bottomLabels = () => {
    return(
      <View style={{flex:1, margin: leftRightMargin+3,  marginBottom: 0, flexDirection: 'row'}}>
        {this.sliderLabels(this.props.sliderLabels)}
      </View>
    )
  }

  setSliderResult(sliderValue){
    this.setState({sliderResult: sliderValue})
  }

  renderFooter(){
    if(this.props.containsSliderLabels){
      return (
        <View style={{height:1, marginTop: leftRightMargin-10, backgroundColor: 'gray'}} />
      )
    }

    return (
      <View style={{height:1, marginTop: leftRightMargin+10, marginBottom: 0, backgroundColor: 'gray'}} />
    )
  }

  render(){
    return(
      <View style={{flex:1, backgroundColor: 'white'}}>
        {this.topLabels()}

        <MultiSlider disabled={false}
            changeScrollState={this.props.changeScrollState}
            hasSteps={false}
            sliderLeftRightMargin={leftRightMargin}
            thumbs={this.createThumbs(this.props.thumbPositions)}
            onRelease={(positions)=>console.log(positions)}
            sliderColor={this.props.sliderColor}
        />


        {this.props.containsSliderLabels && this.bottomLabels()}

        {this.renderFooter()}


      </View>
    );
  }
}



var styles = StyleSheet.create({

});
