import { NavigationActions } from 'react-navigation';
import { MessengerNavigator } from '../navigators/MessengerNavigator';

const initialNavState = MessengerNavigator.router.getStateForAction(
  MessengerNavigator.router.getActionForPathAndParams('Messenger'));

export function messengerNav(state = initialNavState, action){
  switch (action.type) {
    case 'ChatDetail':
      return MessengerNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'ChatDetail' }), state);

      case 'RESET_MESSENGER_ROUTE_STACK':
      {
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({routeName: 'Messenger'})
          ]
        })
        return MessengerNavigator.router.getStateForAction(resetAction, state);
      }

    default:
      return MessengerNavigator.router.getStateForAction(action, state);
  }
}
