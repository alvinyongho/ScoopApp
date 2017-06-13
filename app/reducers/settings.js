import createReducer from '../lib/createReducer';
import * as types from '../actions/types';
import update from 'immutability-helper';


initialSettings = {
  userIsHidden: true
}

export const settings = createReducer(initialSettings, {
  [types.SET_USER_PRIVACY](state, action) {
		return update(state,
			{userIsHidden: {$set: action.isHidden}}
	)}

})
