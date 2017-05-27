import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../../actions';
import { NavigationActions } from 'react-navigation';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight
} from 'react-native';


export class ViewProfileRow extends Component {

  constructor(props){
    super(props)
  }

  render(){
    return (
      <TouchableHighlight onPress={()=>this.props.PreviewProfile()}>
        <View style={{padding: 10, paddingTop: 12, backgroundColor: 'white', flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={{fontSize: 16, fontFamily: 'Avenir-Light', color:'#666666', flex:.5}}> View Profile </Text>
          <View style={{alignItems:'center', justifyContent: 'center', flex: .5}}></View>
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
  PreviewProfile: () => dispatch(NavigationActions.navigate({ routeName: 'PreviewProfile' })),
});


// Connects the state variables to the property variables within
// the home class
export default connect(mapStateToProps, mapDispatchToProps)(ViewProfileRow);
