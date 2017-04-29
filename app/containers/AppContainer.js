import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  TouchableHighlight,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { connect } from 'react-redux';        // handles state and actions
import { ActionCreators } from '../actions';   // Retrieves all the action creators
import { bindActionCreators } from 'redux';
import { NativeRouter, Route, Link, Redirect } from 'react-router-native';

// Views
import Home from './Home';
import WelcomePages from '../components/WelcomePages';
import Filter from './Filter';

import {TabStack} from '../config/TabStack';
import {HomeNavStack} from '../config/HomeNavStack';

class AppContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const Public = () => (<WelcomePages {...this.props}/>)
    const Private = () => (<TabStack {...this.props}/>)
    // Set the route depending on login state
    const ResultRoute = this.props.isAuthenticated ? (Private) : Public;

    return(
      <NativeRouter>
        <View style={{flex:1}}>
          {/* Status bar initial customization */}
          <StatusBar
           backgroundColor="#54C9EC"
           barStyle="light-content" />
          {/* Routes for authenticated and non authenticated */}
          <Route exact path="/" component={ ResultRoute }/>
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
export default connect((state) => { return {isAuthenticated: state.isAuthenticated} }, mapDispatchToProps)(AppContainer);
