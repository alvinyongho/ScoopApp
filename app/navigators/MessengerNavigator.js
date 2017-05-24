import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

// import EditScreen from '../components/MyProfileScreens/EditScreen'
import MessengerScreen from '../components/Messenger/MessengerScreen'
import ChatDetailScreen from '../components/Messenger/ChatDetailScreen'

export const MessengerNavigator = StackNavigator({
  Messenger:  {screen: MessengerScreen },
  ChatDetail: {screen: ChatDetailScreen },
});


const MessengerWithNavigationState = ({dispatch, messengerNav}) => (
  <MessengerNavigator navigation={addNavigationHelpers({ dispatch, state: messengerNav })} />

);

MessengerWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  messengerNav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  messengerNav: state.messengerNav,
});

export default connect(mapStateToProps)(MessengerWithNavigationState);
