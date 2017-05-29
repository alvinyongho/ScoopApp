import { NavigationActions } from 'react-navigation';

export function GoToSettingsNotifications() {
  return(dispatch) => {
    dispatch(NavigationActions.navigate({ routeName: 'SettingsNotifications' }))
  }
}

export function GoToSettingsPrivacy() {
  return(dispatch) => {
    dispatch(NavigationActions.navigate({ routeName: 'SettingsPrivacy' }))
  }
}

export function GoToSettingsDeleteAccount() {
  return(dispatch) => {
    dispatch(NavigationActions.navigate({ routeName: 'SettingsDeleteAccount' }))
  }
}

export function GoToSettingsPrivacyPolicy() {
  return(dispatch) => {
    dispatch(NavigationActions.navigate({ routeName: 'SettingsPrivacyPolicy' }))
  }
}

export function GoToSettingsTOS(){
  return(dispatch) => {
    dispatch(NavigationActions.navigate({ routeName:'SettingsTOS' }))
  }
}


export function GoToSettingsRateScoop(){console.log('todo rate scoopp')}
export function Logout(){console.log('todo logout')}
export function HideProfile(){console.log('todo hide profile')}
