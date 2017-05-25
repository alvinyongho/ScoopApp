import { NavigationActions } from 'react-navigation';
import { MyProfileNavigator } from '../navigators/MyProfileNavigator';

const initialNavState = MyProfileNavigator.router.getStateForAction(
  MyProfileNavigator.router.getActionForPathAndParams('Edit'));

export function myProfileNav(state = initialNavState, action){
  switch (action.type) {
    case 'PreviewProfile':
      return MyProfileNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'PreviewProfile' }), state);
    case 'Settings':
      return MyProfileNavigator.router.getStateForAction(NavigationActions.navigate({ routeName: 'Settings' }), state);
    default:
      return MyProfileNavigator.router.getStateForAction(action, state);
  }
}
