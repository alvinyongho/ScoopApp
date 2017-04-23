import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';        // handles state and actions
import { ActionCreators } from '../actions'   // Retrieves all the action creators
import { bindActionCreators } from 'redux'
import Home from './Home'

import { NativeRouter, Route, Link, Redirect } from 'react-router-native'

//WelcomeVC Specific
import { Pages } from 'react-native-pages';
import Swiper from 'react-native-swiper';

var styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
})


//
class Login extends Component {
  render(){
    return(
      <View>
        <Text> Successfully logged in message </Text>
        <Link
            to="/home"
            style={{margin: 20}}
            >
              <Text>Go to home</Text>
        </Link>

      </View>

    );
  }
}

class WelcomeVC extends Component {
  render(){
    return(
      <WelcomeSlider />
    );
  }
}

class WelcomeSlider extends Component {
  render(){
    return(
      <Swiper style={styles.wrapper} showsButtons={true}>
        <View style={styles.slide1}>
          <Text style={styles.text}>Scoops App</Text>
        </View>
        <View style={styles.slide2}>
          <Text style={styles.text}>Find your</Text>
        </View>
        <View style={styles.slide3}>
          <Text style={styles.text}>Perfect Match</Text>
        </View>
        <View style={styles.slide3}>
          <Link to="/login">
            <Text style={styles.text}>Login with Facebook</Text>
          </Link>
        </View>
      </Swiper>
    )
  }
}


class AppContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <NativeRouter>
        <View>
          <Route exact path="/" component={() => (<WelcomeVC/>)}/>
          <Route path="/login" component={() => (<Login {...this.props}/>)}/>
          <Route path="/home"  component={() => (<Home {...this.props}/>)}/>
        </View>
      </NativeRouter>

  );
  }
};


// maps action creator calls to a dispatch to update the state
// Bind actions (dispatcher) to props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

// maps the state properties to this.props.____
// which is defined from the return value of the function in connect
export default connect((state) => { return {} }, mapDispatchToProps)(AppContainer);
