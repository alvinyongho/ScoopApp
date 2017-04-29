import * as types from './types'


// // Make async call to the web service to get the list of matches that
// // fit in the criterias defined by match attributes
// export function fetchMatches(match_attributes){
//   return(dispatch, getState) => {
//     console.log(getState());
//
//     // Placeholder response object
//     let response = ([{id: 0, 'name': 'IU', 'description': 'Kpop Singer'},
//                      {id: 1, 'name': 'Forrest Gump', 'description': 'Tom Hanks'},
//                      {id: 2, 'name': 'James Bond', 'description': 'Secret Service Agent'}
//                    ]);
//
//     // then
//     dispatch(setFoundMatches( { matches_found: response } ));
//
//   }
//
// }


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
