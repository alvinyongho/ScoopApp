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


export default class SettingsRow extends Component {


  // Set prop to define state of switch Value in parent
  constructor(props){
    super(props)

    this.state = {
      switchValue: this.props.switchValue,
    };
  }


  rightSideComponent(type){
    if(type==="switch")
      return(
        <View style={{marginRight:10}}><Switch
        onValueChange={(value) => {
          console.log(value)
          this.setState({switchValue: value})}}
        onTintColor="#54C9EC"
        value={this.state.switchValue} /></View>
      );
    else if(type==="navigation")
      return (
        <Icon name="chevron-right" size={30} color="#BBBBBB" />
      );
    else
      return null
  }

  handleClick(){
    if(this.props.rightComponent === "switch"){
      currStateValue = this.state.switchValue
      this.setState({switchValue: !currStateValue})
      this.props.onClick(!currStateValue)
    }
    else {
      this.props.onClick()
    }
  }


  render(){
    return (
      <TouchableHighlight onPress={()=> this.handleClick()}>
        <View style={{alignItems: 'center', paddingLeft: 15, backgroundColor: 'white', flex: 1, flexDirection: 'row'}}>
          <Text style={{paddingTop: 10, paddingBottom: 10, fontSize: 16, fontFamily: 'Avenir-Light', color:'#666666', flex:.5}}>{this.props.title}</Text>
          <View style={{marginRight: 0, alignItems:'center', justifyContent: 'center',  alignItems:'flex-end', flex: .5}}>{this.rightSideComponent(this.props.rightComponent)}</View>
        </View>
      </TouchableHighlight>
    );
  }

}
//
// // Match state to props which allows us to access actions
// function mapStateToProps(state){
//   return {
//   }
// }
//
//
// const mapDispatchToProps = dispatch => ({
// });
//
//
// // Connects the state variables to the property variables within
// // the home class
// export default connect(mapStateToProps, mapDispatchToProps)(SettingsRow);
