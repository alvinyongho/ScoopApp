import { NavigationActions } from 'react-navigation';
import { MessengerNavigator } from '../navigators/MessengerNavigator';

const initialNavState = MessengerNavigator.router.getStateForAction(
  MessengerNavigator.router.getActionForPathAndParams('Messenger'));

export function messengerNav(state = initialNavState, action){
  switch (action.type) {
    case 'ChatDetail':
      return HomeNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'ChatDetail' }), state);
    default:
      return MessengerNavigator.router.getStateForAction(action, state);
  }
}
