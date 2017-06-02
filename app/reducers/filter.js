import createReducer from '../lib/createReducer';
import * as types from '../actions/types';



const default_filters = {
    ageMax:99,
    ageMin:18,
    heightMax:96,
    heightMin:36,
    interestedIn:3,
    lookingForMax:5,
    lookingForMin:1,
    searchRadius:200}

const default_slider_vals = {
  SEARCH_RADIUS: [1],
  AGE_RANGE: [0,1],
  HEIGHT: [0,1],
  LOOKING_FOR: [0,1],
  INTERESTED_IN: [1],
}



export const previousFilters = createReducer({}, {
  [types.SET_PREV_FILTERS](state, action){
    console.log('setting previous filters')
    return action.prev_filters
  }
});


export const prevSliderValues = createReducer(default_slider_vals, {
  [types.UPDATE_SLIDER](state, action){
    const newState= Object.assign({}, state);

    slider_type = action.slider_type
    slider_value = action.slider_value

    Object.keys(newState).map((key, index)=>{
      if(key === slider_type){
        newState[key] = slider_value
      }
    })
    return newState
  }
})


export const filtersToSave = createReducer(default_filters, {
  [types.UPDATE_FILTER](state, action){
    const newState = Object.assign({}, state);
    keyToMatch = Object.keys(action.filter_setting)[0]
    Object.keys(newState).map((key, index)=>{
      if(key === keyToMatch){
          console.log('FOUND KEY')
          console.log(action.filter_setting[key])
          newState[key] = action.filter_setting[key]
      }
    })
    return newState
  }
})
