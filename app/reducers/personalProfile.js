import createReducer from '../lib/createReducer';
import * as types from '../actions/types';

import update from 'immutability-helper';


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


export const myAlbumCovers = createReducer({},{
	[types.ADD_ALBUM_IDS](state, action){
		const newState = Object.assign({}, state);
		idToAdd = action.albumId
    newState[idToAdd] = {albumId: action.albumId, albumName: action.albumName, coverId: action.coverId}
    return newState
	},
})


export const myAlbumImages = createReducer({}, {
	[types.SET_ALBUM_DETAIL_IMAGES](state, action){
		return action.albumImages
	},

})

const initialAlbumDetailState = {
    albumImages:[],
		albumCoverIds:[],
		albumCoverURLs:[]
}

export const albumDetails = createReducer(state = initialAlbumDetailState, {
	[types.ADD_ALBUM_COVER_URL](state, action){
			return update(state, {
				albumCoverURLs: {
					[action.albumId]: {$set: action.coverURL}
				}
			})
	},

	[types.SET_COVER_PHOTO_IDS](state, action) {
		return update(state, {
			albumCoverIds: {
				[action.albumOrderIndex]: {$set: action.coverPhotoId }
			}
		});
	},

	[types.GOT_MY_ALBUMS](state, action) {
		return update(state, {
			albumIds: {$set: action.albums}
		})
	},

	[types.ADD_ALBUM_DETAIL_IMAGES_URL](state, action){
		return update(state, {
	    albumImages: {
	      [action.index]: {$set: action.albumImageURL}
	    }
	  });

	},
	[types.SET_ALBUM_IMAGE_TO_SAVE](state,action){
		return update(state, {
			albumToSave: {$set: action.photoId}
		})
	},

	[types.SET_IMAGE_URL_TO_PREVIEW](state,action){
		return update(state, {
			albumToPreview: {$set: action.url}
		})
	},

	[types.RESET_ALBUM_IMAGE_PREVIEW](state, action){
		return update(state, {
			albumToSave: {$set: {}},
			albumToPreview: {$set: ""}
		})
	},

	[types.EXIT_ALBUM_DETAIL](state, action){
		return update(state, {
			albumImages: {$set: []}
		})
	}

})


export const importPictureIntoSlot = createReducer({},{
	[types.IMPORT_PICTURE](state, action){
		return action.albumSlot
	}
})
