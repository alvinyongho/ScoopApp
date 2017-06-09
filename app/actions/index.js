import * as FeedlistActions from './feedlist';
import * as LoginActions from './auth';
import * as FilterActions from './filter';
import * as MessengerActions from './messenger';
import * as PhotoAlbumActions from './photoAlbum';
import * as PersonalProfileActions from './personalProfile';

import * as SettingsNavActions from  './settingsNavigationActions'
import * as PersonalDetailsActions from './profilePersonalDetails'

export const ActionCreators = Object.assign({},
  LoginActions,
  FeedlistActions,
  FilterActions,
  MessengerActions,
  SettingsNavActions,
  PhotoAlbumActions,
  PersonalProfileActions,
  PersonalDetailsActions
);
