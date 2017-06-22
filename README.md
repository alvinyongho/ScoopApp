#### Feedlist

###### Location State
  * NOT_SET // Todo: loading bar
  * AVAILABLE // Renders the scroll view
  * PERMISSION_NEEDED // Todo: Error feedback
  * LOCATION_UNAVAILABLE // Todo: Error Feedback


###### AppState
  * Reloads the feed
  * Todo: Reload the unread messages list

##### Action Creator
app/actions/feedlist
* updateCurrentLocation()
  * Gets called inside the feedList container which should populate the currentLocation state



##### Action
app/actions/feedlist

* **setCurrentLocation( *current_location* )**
  * Action creator calls this to update the state of current location
  * current_location is an object with a lat and lon property
    * { lat: (Integer), lon: (Integer) }


##### Reducer
app/reducers/feedlist
* *currentLocation* is the name of the state that gets updated from the action. It takes in the current_location property of the dispatched action with the type SET_CURRENT_LOCATION



#### Lifecycle
  * componentWillMount()
    * get the current location
