import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

// import EditScreen from '../components/MyProfileScreens/EditScreen'
import MessengerScreen from '../containers/Messenger/Messenger'
import ChatDetail from '../containers/Messenger/ChatDetail'

export const MessengerNavigator = StackNavigator({
  Messenger:  {screen: MessengerScreen },
  ChatDetail: {screen: ChatDetail },
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
