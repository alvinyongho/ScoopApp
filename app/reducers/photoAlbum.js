import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const isAlbumOpened = createReducer(false, {
	[types.OPEN_ALBUM](state, action) {
		return true
	},
	[types.CLOSE_ALBUM](state, action) {
		return false
	}
})
