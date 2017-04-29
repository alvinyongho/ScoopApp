import * as FeedlistActions from './feedlist';
import * as LoginActions from './auth'
import * as FilterActions from './filter'

export const ActionCreators = Object.assign({},
  LoginActions,
  FeedlistActions,
  FilterActions,
);
