import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';        // handles state and actions
import { ActionCreators } from '../actions';   // Retrieves all the action creators
import { bindActionCreators } from 'redux';
import { NativeRouter, Route, Link, Redirect } from 'react-router-native';

// Views
import Home from './Home';
import Login from './Login';
import WelcomePages from '../components/WelcomePages';
import Filter from './Filter';



class AppContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const Public = () => (<WelcomePages {...this.props}/>)
    const Private = () => (<Home {...this.props}/>)
    // Set the route depending on login state
    const ResultRoute = this.props.isAuthenticated ? (Private) : Public;

    return(
      <NativeRouter>
        <View>
          <Route exact path="/" component={ ResultRoute }/>
          <Route path="/login"  component={() => (<Login  {...this.props} />)}/>
          <Route path="/home"   component={() => (<Home   {...this.props} />)}/>
          <Route path="/filter" component={() => (<Filter {...this.props} />)}/>
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
