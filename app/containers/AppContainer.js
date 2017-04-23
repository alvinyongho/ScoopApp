import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';        // handles state and actions
import { ActionCreators } from '../actions'   // Retrieves all the action creators
import { bindActionCreators } from 'redux'
import Home from './Home'

import { NativeRouter, Route, Link } from 'react-router-native'

//
// class HomeWrapper extends Component {
//   render(){
//     return(
//       <Home {...this.props}/>
//     );
//   }
// }

class AppContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <NativeRouter>
        <View style={{margin: 20}}>
        <Link
            to="/home"
            >
              <Text>Home</Text>
        </Link>

        <Route exact path="/home"  component={() => (<Home {...this.props}/>)}/>
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
