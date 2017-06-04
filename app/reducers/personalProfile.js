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


export const myAlbumCovers = createReducer({},{
	[types.ADD_ALBUM_IDS](state, action){
		const newState = Object.assign({}, state);
		idToAdd = action.albumId
		console.log('ID TO ADD')
		console.log(idToAdd)

    newState[idToAdd] = {albumId: action.albumId, albumName: action.albumName, coverId: action.coverId}


    return newState

	},
})

export const myAlbumCoverUrls = createReducer({},{
	[types.ADD_ALBUM_COVER_URL](state, action){
		console.log('ADDING')

		const newState = Object.assign({}, state);
		idToAdd = action.albumId

    newState[idToAdd] = {albumId: action.albumId, coverURL: action.coverURL}

    return newState
	}
})


export const importPictureIntoSlot = createReducer({},{
	[types.IMPORT_PICTURE](state, action){
		return action.albumSlot
	}
})
