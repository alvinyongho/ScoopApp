import React, {Component} from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';

import {
  View,
  Text,
  ListView,
  Image,
} from 'react-native';

import Button from 'react-native-button';


const DeleteButton = (props) => {
  if(props.editMessages === true){
    return (
      <Button onPress={() => {props.cancelEditChats()} }>
        <Text style={{marginRight: 20, fontFamily:'Avenir-Light', fontSize: 18, color:'white'}}>Delete</Text>
      </Button>
    );
  }
  return null;
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state){
  return {
    editMessages: state.editMessages
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteButton);
