import {NavigationActions} from 'react-navigation';
import {ScoopTabsNavigator} from '../navigators/ScoopTabsNavigator';


const initialNavState = ScoopTabsNavigator.router.getStateForAction(
  ScoopTabsNavigator.router.getActionForPathAndParams('Home'));


export function tabNav(state = initialNavState, action){
  switch(action.type){
    case 'Home':
      return ScoopTabsNavigator.router.getStateForAction(NavigationActions.navigate({routeName:'Home'}), state);
    case 'Message':
      return ScoopTabsNavigator.router.getStateForAction(NavigationActions.navigate({routeName:'Message'}), state);
    case 'MyProfile':
      return ScoopTabsNavigator.router.getStateForAction(NavigationActions.navigate({routeName:'MyProfile'}), state);
    default:
      return ScoopTabsNavigator.router.getStateForAction(action, state);
  }
}
