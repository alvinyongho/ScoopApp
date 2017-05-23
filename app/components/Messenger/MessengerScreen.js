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

import Messenger from '../../containers/Messenger/Messenger'

class MessengerScreen extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    <Messenger />
  }
}


const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
});


export default connect(mapStateToProps, mapDispatchToProps)(MessengerScreen);
