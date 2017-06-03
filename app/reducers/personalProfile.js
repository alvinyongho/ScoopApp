import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const myProfileImages = createReducer({}, {
	[types.GET_MY_IMAGES](state, action) {
		return action.images
	},
})
