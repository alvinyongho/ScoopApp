import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const isAlbumOpen = (false, {
	[types.OPEN_PHOTO_ALBUM](state, action) {
		return true
	},
	[types.CLOSE_PHOTO_ALBUM](state, action) {
		return false
	}
})