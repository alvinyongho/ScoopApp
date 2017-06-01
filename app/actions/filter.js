import * as types from './types'
import {
  performLoadFeedTask,
  performLoadProfileTask,
  performLoadFeedWithNoGeo,
  performSaveFilterSettings } from '../lib/scoopAPI'


export function saveFilters(save_filter_settings){

  return(dispatch, getState) => {
    performSaveFilterSettings(579, 'bdvvqtctgs').then((results) => {
      // TODO: save the filters to local state via reducer function
      console.log(results)
    })
  }
}


export function fetchFilters(match_attributes){
  return(dispatch, getState) => {
    let scoopUserId = getState().scoopUserProfile.scoopId
    let scoopUserToken = getState().scoopUserProfile.scoopToken

    performLoadFeedWithNoGeo(scoopUserId, scoopUserToken).then((results) => {
      var current_year = new Date().getFullYear()
      var min_year = results.params[4].split('-')[0]
      var max_year = results.params[5].split('-')[0]

      var max_age = current_year - min_year
      var min_age = current_year - max_year
      var min_height_inches = results.params[6]
      var max_height_inches = results.params[7]


      dispatch(
        setPrevFilters(
          {
            'minYear': min_year,
            'maxYear': max_year,
            'maxAge': max_age,
            'minAge': min_age,
            'maxHeightInches': max_height_inches,
            'minHeightInches': min_height_inches,
          }
        )
      );

    });
  }
}


export function changeFilterSetting(filter_setting){
  // TODO: Update the temporary storage for the filter settings
  return(dispatch, getState) => {
    updated_filter_setting = {}

    console.log('updating the filter setting: ...TODO')
    dispatch(updateFilter({filter_setting: updated_filter_setting}))

  }
}

export function saveFilterSetting(){
  // TODO: Set new filter setting as temporary storage variables for filter settings

}

export function resetFilterSetting(){
  // TODO: Reset the temporary storage
  // Probaby don't need this

}

export function updateFilter(filter_setting){     // Temp Memory setter
  return {
    type: types.UPDATE_FILTER,
    filter_setting
  }
}

export function resetFilter(original_settings){      // Resetter
  return {
    type: types.RESET_FILTER,
    original_settings
  }
}

export function saveFilter(new_settings){
  return {
    type: types.SAVE_FILTER,
    new_settings
  }
}

export function setPrevFilters(prev_filters){
  return{
    type: types.SET_PREV_FILTERS,
    prev_filters
  }
}
