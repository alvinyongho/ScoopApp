import * as types from './types'
import {
  performLoadFeedTask,
  performLoadProfileTask,
  performLoadFeedWithNoGeo,
  performSaveFilterSettings } from '../lib/scoopAPI'



export function saveFilters(){
  return(dispatch, getState) => {
    let scoopUserId = getState().scoopUserProfile.scoopId
    let scoopUserToken = getState().scoopUserProfile.scoopToken
    filterSettings = getState().filtersToSave
    let filterSettings = {
      filterAgeMax:         filterSettings.ageMax,
      filterAgeMin:         filterSettings.ageMin,
      filterHeightMax:      filterSettings.heightMax,
      filterHeightMin:      filterSettings.heightMin,
      filterInterestedIn:   filterSettings.interestedIn,
      filterLookingForMax:  filterSettings.lookingForMax,
      filterLookingForMin:  filterSettings.lookingForMin,
      filterSearchRadius:   filterSettings.searchRadius
    }



    performSaveFilterSettings(scoopUserId, scoopUserToken, filterSettings).then((results) => {


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

      var max_age = Math.min(99, current_year - min_year)
      var min_age = current_year - max_year
      var min_height_inches = results.params[6]
      var max_height_inches = results.params[7]

    //
    //   console.log('THE PREV FILTERS')
    //   console.log({
    //     'minYear': min_year,
    //     'maxYear': max_year,
    //     'maxAge': max_age,
    //     'minAge': min_age,
    //     'maxHeightInches': max_height_inches,
    //     'minHeightInches': min_height_inches
    // })

      dispatch(setPrevFilters({
        'minYear': min_year,
        'maxYear': max_year,
        'maxAge': max_age,
        'minAge': min_age,
        'maxHeightInches': max_height_inches,
        'minHeightInches': min_height_inches, }));
    });
  }
}





export function changeFilterSetting(filter_setting){
  // TODO: Update the temporary storage for the filter settings
  return(dispatch, getState) => {
    dispatch(updateFilter({...filter_setting}))

  }
}

export function saveFilterSetting(){
  // TODO: Set new filter setting as temporary storage variables for filter settings

}

export function resetFilterSetting(){
  // TODO: Reset the temporary storage
  // Probaby don't need this

}

export function updateSliderSetting(slider_type, slider_value){
  // console.log('UPDATING SLIDER')
  return(dispatch, getState)=>{
    dispatch(updateSlider(slider_type, slider_value))
  }
}

export function updateFilter(filter_setting){     // Temp Memory setter
  return {
    type: types.UPDATE_FILTER,
    filter_setting
  }
}

export function updateSlider(slider_type, slider_value){
  return {
    type: types.UPDATE_SLIDER,
    slider_type,
    slider_value
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
