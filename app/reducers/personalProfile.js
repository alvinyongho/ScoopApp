import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

export const myProfileImages = createReducer({}, {
	[types.GET_MY_IMAGES](state, action) {
		return action.images
	},
	[types.SET_MY_IMAGES](state, action) {
		return action.images
	},
})

export const myFacebookAlbums = createReducer({},{
	[types.GOT_MY_ALBUMS](state, action) {
		return action.albums
	}
})

export const importPictureIntoSlot = createReducer({},{
	[types.IMPORT_PICTURE](state, action){
		return action.albumSlot
	}
})
