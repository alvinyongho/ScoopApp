import React, { Component } from 'react';

//Login Container
import Auth from './Auth'
export default class Login extends Component {
  render(){
    return(
      <Auth {...this.props}/>
    );
  }
}
