import * as types from './types'

export function openPhotoAlbum() {
	return (dispatch) => {
		dispatch(openAlbum());
	}
}

export function closePhotoAlbum() {
	return (dispatch) => {
		dispatch(closeAlbum);
	}
}

export function openAlbum() {
	return {
		type: types.OPEN_ALBUM
	}
}

export function closeAlbum() {
	return {
		type: types.CLOSE_ALBUM
	}
}
