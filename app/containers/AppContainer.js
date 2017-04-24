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
import { NativeRouter, Route, Link, Redirect } from 'react-router-native'

// Views
import Home from './Home'
import WelcomePages from '../components/WelcomePages'


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


class AppContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <NativeRouter>
        <View>
          <Route exact path="/" component={() => (<WelcomePages/>)}/>
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
