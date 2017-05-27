import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch
} from 'react-native';

import RowDivider from './RowDivider'

import {Slider} from './ProfileSlider'

export default class ConnectedAppsRow extends Component {

  constructor(props){
    super(props)
  }

  render(){
    return (
      <View style={{paddingLeft: 15, backgroundColor:'white'}}>

        <AppSwitchRow changeScrollState={this.props.changeScrollState} showSlider={true}rowItemName="Facebook"/>
        <RowDivider />

        <AppSwitchRow changeScrollState={this.props.changeScrollState} rowItemName="FitBit"/>
        <RowDivider />

        <AppSwitchRow changeScrollState={this.props.changeScrollState} rowItemName="Pinterest"/>
        <RowDivider />

        <ComingSoonRow />
      </View>

    );
  }

}


export class AppSwitchRow extends Component {

  constructor(props){
    super(props)

    this.state = {
      colorTrueSwitchIsOn: true,
      colorFalseSwitchIsOn: false,
    };
  }

  render(){
    return (
      <View style={{height: 50, flex:1, flexDirection:'row', alignItems:'center'}}>

        <View style={{width: 25, height:25, borderRadius: 25/2, backgroundColor:'skyblue', marginRight:10}}/>
        <View style={{flex: .3}}>
          <Text style={{fontSize: 16, fontFamily:'Avenir-Light'}}>{this.props.rowItemName}</Text>
        </View>

        {this.props.showSlider &&
        <View style={{ flex: .4, width: 100, left: 40}}>
        <Slider changeScrollState={this.props.changeScrollState} />
        </View>
        }

        {this.props.showSlider?
        <View style={{flex:.3, alignItems:'flex-end', marginRight:20}}>
          <Text>56&#37;</Text>
        </View>
        :
        <View style={{flex:.3, alignItems:'flex-end', marginRight: 20}}>
          <Switch
          onValueChange={(value) => this.setState({colorTrueSwitchIsOn: value})}
          onTintColor="#54C9EC"

          value={this.state.colorTrueSwitchIsOn} />
        </View>
        }
      </View>


    );
  }

}

export class ComingSoonRow extends Component {
  render(){
    return(
      <View style={{height: 40, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row'}}>
        <Text style={{fontSize: 16, fontFamily: 'Avenir-Light'}}>Coming Soon:</Text>
          <View style={{ marginLeft:5, marginRight: 5,  height: 20, width:20, borderRadius: 20/2, backgroundColor: 'red'}}/>
          <View style={{ marginLeft:5, marginRight: 5,  height: 20, width:20, borderRadius: 20/2, backgroundColor: 'red'}}/>
          <View style={{ marginLeft:5, marginRight: 5,  height: 20, width:20, borderRadius: 20/2, backgroundColor: 'red'}}/>
      </View>
    );
  }
}
