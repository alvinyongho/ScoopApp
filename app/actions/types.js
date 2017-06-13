// settings

export const SET_USER_PRIVACY = 'SET_USER_PRIVACY'

// feedlist
export const SET_SEARCHED_SCOOPS = 'SET_SEARCHED_SCOOPS';
export const ADD_MATCH = 'ADD_MATCH';
export const SET_FOUND_MATCHES = 'SET_FOUND_MATCHES';


// auth
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGOUT = 'LOGOUT'
export const GET_TOKEN = 'GET_TOKEN'


// HOME COMPONENTS
//  * feedlist
export const VIEW_PROFILE  = 'VIEW_PROFILE'
export const LOADING_USER  = 'LOADING_USER'


//  * filters
export const UPDATE_FILTER = 'UPDATE_FILTER'
export const UPDATE_SLIDER = 'UPDATE_SLIDER'

export const RESET_FILTER  = 'RESET_FILTER'
export const SAVE_FILTER   = 'SAVE_FILTER'
export const SET_PREV_FILTERS = 'SET_PREV_FILTERS'


// Messenger
export const EDIT_CHATS = 'EDIT_CHATS'
export const CANCEL_EDIT_CHATS = 'CANCEL_EDIT_CHATS'
export const SET_UNREAD_COUNT = 'SET_UNREAD_COUNT'
export const SET_MESSAGE_LIST = 'SET_MESSAGE_LIST'
export const SET_THREAD_CONTENT = 'SET_THREAD_CONTENT'

export const ADD_MESSAGE_TO_THREAD = 'ADD_MESSAGE_TO_THREAD'
export const HIDE_MESSAGES = 'HIDE_MESSAGES'

// Message Detail Navigation
export const SET_MESSAGE_TARGET_ID = 'SET_MESSAGE_TARGET_ID'


// Photo Album
export const OPEN_ALBUM = 'OPEN_ALBUM'
export const CLOSE_ALBUM = 'CLOSE_ALBUM'


// personal profile
export const GET_MY_PROFILE = 'GET_MY_PROFILE'
export const GOT_EDU_BACKGROUND = 'GOT_EDU_BACKGROUND'















// Photo Album stuff...TODO cleanup unused and concat reducers and remove obsoletes

export const GET_MY_IMAGES = 'GET_MY_IMAGES'
export const SET_MY_IMAGES = 'SET_MY_IMAGES'

export const ADD_ALBUM = 'ADD_ALBUM'
export const ADD_ALBUM_IDS = 'ADD_ALBUM_IDS'
export const ADD_ALBUM_COVER_URL = 'ADD_ALBUM_COVER_URL'
export const GOT_MY_ALBUMS = 'GOT_MY_ALBUMS'
export const IMPORT_PICTURE = 'IMPORT_PICTURE'

export const SET_ALBUM_DETAIL_IMAGES = 'SET_ALBUM_DETAIL_IMAGES'
export const ADD_ALBUM_DETAIL_IMAGES_URL = 'ADD_ALBUM_DETAIL_IMAGES_URL'
export const EXIT_ALBUM_DETAIL ='EXIT_ALBUM_DETAIL'

export const SET_ALBUM_IMAGE_TO_SAVE ='SET_ALBUM_IMAGE_TO_SAVE'
export const SET_IMAGE_URL_TO_SAVE = 'SET_IMAGE_URL_TO_SAVE'
export const SET_IMAGE_URL_TO_PREVIEW = 'SET_IMAGE_URL_TO_PREVIEW'

export const UPDATE_ALBUM_PHOTOS = 'UPDATE_ALBUM_PHOTOS'


export const SET_COVER_PHOTO_IDS = 'SET_COVER_PHOTO_IDS'
export const RESET_ALBUM_IMAGE_PREVIEW = 'RESET_ALBUM_IMAGE_PREVIEW'
export const APPEND_TO_MY_PICTURE_ORDER = 'APPEND_TO_MY_PICTURE_ORDER'
export const RESET_MY_PROFILE_NAV = 'RESET_MY_PROFILE_NAV'

// sets the prop for the photoalbum pictures
export const SYNC_WITH_PHOTO_ALBUM_ORDER = 'SYNC_WITH_PHOTO_ALBUM_ORDER'
export const SYNC_WITH_SET_RESULT = 'SYNC_WITH_SET_RESULT'

// for setting an album at a certain index on a save
export const ALBUM_SET_IMAGEURL_AT_INDEX = 'ALBUM_SET_IMAGEURL_AT_INDEX'
export const REPLACING_IMAGE = 'REPLACING_IMAGE'
export const VIEWING_ALBUM ='VIEWING_ALBUM'
