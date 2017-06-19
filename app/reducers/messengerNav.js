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
      if (action.type === 'Navigation/NAVIGATE') {
          const { routes, index } = state;
          const { routeName, params } = action;
          currentTab = routes
          const lastScene = currentTab[currentTab.length - 1];

          // Check for duplication
          if (lastScene.routeName === routeName && (lastScene.params == params)) {
              return state;
          }
      }



      return MessengerNavigator.router.getStateForAction(action, state);
  }
}
