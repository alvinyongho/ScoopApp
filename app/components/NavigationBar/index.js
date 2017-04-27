import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
} from 'react-native';
import images from '@assets/images';


const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: '#5AC9EA',
  },
  navBar: {
    backgroundColor: '#5AC9EA',
  },
  title: {
    color: '#fff',
  },
  buttonText: {
    color: '#fff',
  },
})

// Navbar
import NavBar, { NavButton, NavButtonText, NavTitle } from 'react-native-nav'

export default class NavigationBar extends Component {
  render() {
    const {
      leftNavButtonText,
      rightNavButtonText,
    } = this.props

    return (
      <NavBar style={styles} statusBar={{ barStyle: 'light-content' }}>
        <NavButton onPress={() => alert('hi')}>
          <NavButtonText style={styles.buttonText}>
            {this.props.leftNavButtonText}
          </NavButtonText>
        </NavButton>
        <Image source={images.scoopLogo} resizeMode='contain' style={{marginTop:5, marginLeft:-17, height:20, width:100 }}/>
        <NavButton onPress={() => alert('hi')}>
          <NavButtonText style={styles.buttonText}>
            {this.props.rightNavButtonText}
          </NavButtonText>
        </NavButton>
      </NavBar>
    )
  }
}
