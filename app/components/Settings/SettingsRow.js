import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { NavigationActions } from 'react-navigation';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  Switch
} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';


export class SettingsRow extends Component {

  constructor(props){
    super(props)
    this.state = {
      colorTrueSwitchIsOn: true,
      colorFalseSwitchIsOn: false,
    };
  }

  rightSideComponent(type){
    if(type==="switch")
      return(
        <View style={{marginRight:10}}><Switch
        onValueChange={(value) => this.setState({colorTrueSwitchIsOn: value})}
        onTintColor="#54C9EC"
        value={this.state.colorTrueSwitchIsOn} /></View>
      );
    else if(type==="navigation")
      return (
        <Icon name="chevron-right" size={30} color="#BBBBBB" />
      );
    else
      return null
  }

  render(){
    return (
      <TouchableHighlight onPress={()=>console.log('TODO')}>
        <View style={{alignItems: 'center', paddingLeft: 15, backgroundColor: 'white', flex: 1, flexDirection: 'row'}}>
          <Text style={{paddingTop: 10, paddingBottom: 10, fontSize: 16, fontFamily: 'Avenir-Light', color:'#666666', flex:.5}}>{this.props.title}</Text>
          <View style={{marginRight: 0, alignItems:'center', justifyContent: 'center',  alignItems:'flex-end', flex: .5}}>{this.rightSideComponent(this.props.rightComponent)}</View>
        </View>
      </TouchableHighlight>
    );
  }

}

// Match state to props which allows us to access actions
function mapStateToProps(state){
  return {
  }
}


const mapDispatchToProps = dispatch => ({
});


// Connects the state variables to the property variables within
// the home class
export default connect(mapStateToProps, mapDispatchToProps)(SettingsRow);
