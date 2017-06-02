import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';

import ProfileAlbum from '../../components/Profile/ProfileAlbum'
import ProfileBasicInfo from '../../components/Profile/ProfileBasicInfo'
import SendMessageButton from '../../components/Profile/SendMessageButton'


import RowDivider from '../../components/Profile/ProfileTableRow/RowDivider'
import BasicRow from '../../components/Profile/ProfileTableRow/BasicRow'
import SectionTitle from '../../components/Profile/ProfileTableRow/SectionTitle'
import ProfileSlider from '../../components/Profile/ProfileTableRow/ProfileSlider'

import Button from 'react-native-button'

import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';

FB_EXPIRED_URL = 'https://scontent.xx.fbcdn.net'


function distance(lat1, lon1, lat2, lon2, unit) {
	var radlat1 = Math.PI * lat1/180
	var radlat2 = Math.PI * lat2/180
	var theta = lon1-lon2
	var radtheta = Math.PI * theta/180
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist)
	dist = dist * 180/Math.PI
	dist = dist * 60 * 1.1515
	if (unit=="K") { dist = dist * 1.609344 }
	if (unit=="N") { dist = dist * 0.8684 }
	return dist
}


export class ProfileDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isScrollEnabled: true
    };
  }

  changeScrollState = (isEnabled) => {
    this.setState({isScrollEnabled: isEnabled})
  }

  _getHeight = () => {
    if(this.props.userDetail.heightInches){
      console.log(this.props.userDetail.heightInches)
        ft = Math.floor(parseInt(this.props.userDetail.heightInches)/12)
        inches = parseInt(this.props.userDetail.heightInches)-(12*ft)
      return(<Text>{`${ft}'${inches}"`}</Text>)
    } else {
      return(<Text>Ask me!</Text>)
    }
  }

  _getOffSpring = () => {
    if(this.props.userDetail.offspring === "0"){
      return(<Text>Ask me!</Text>)
    }
    return(<Text>TODO!</Text>)
  }

  _getBodyType = () => {
    if(this.props.userDetail.offspring === "0"){
      return(<Text>Ask me!</Text>)
    }
    return(<Text>TODO!</Text>)
  }

  _getDistanceInMiles = () => {
    return Math.floor(this.props.userDetail.distance)
  }

  render() {
    if(!this.props.isLoadingUser){
    return(
      <View style={{backgroundColor:'#E6E6E6'}}>
        <ScrollView scrollEnabled={this.state.isScrollEnabled}>
          {this.props.userDetail.images &&
            <ProfileAlbum
              images={this.props.userDetail.images}
              changeScrollState={this.changeScrollState}
            />
          }

          {this.props.userDetail &&
          <ProfileBasicInfo
                name = {this.props.userDetail.firstName}
                distance = {`${this._getDistanceInMiles()} mi`}
                schoolName = {this.props.userDetail.schoolName}
                relationshipStatus = {"Single"}
          />
          }
          <SendMessageButton name={this.props.userDetail.firstName}/>


          <View style={{paddingTop: 10, paddingLeft: 15, backgroundColor: 'white'}}>
            <BasicRow rowItemName={'Height'} rowItemValue={this._getHeight()}/>
            <RowDivider />
            <BasicRow rowItemName={'Offspring'} rowItemValue={this._getOffSpring()}/>
            <RowDivider />
            <BasicRow rowItemName={'Body Type'} rowItemValue={this._getBodyType()}/>
          </View>

          <SectionTitle title={'LOOKING FOR'}/>
          <ProfileSlider changeScrollState={this.changeScrollState} />

          <SectionTitle title={'CONNECTED APPS'}/>
          <View style={{backgroundColor:'white', paddingLeft: 15}}>
            <View style={{justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row'}}>
              <View style={{height:50, width:50, margin: 15, marginLeft: 0, marginRight: 0, borderRadius: 50/2, backgroundColor: 'green'}}/>
              <View style={{height:50, width:50, margin: 15, marginRight: 0, borderRadius: 50/2, backgroundColor: 'green'}}/>
              <View style={{height:50, width:50, margin: 15, marginRight: 0, borderRadius: 50/2, backgroundColor: 'green'}}/>
            </View>

            <View style={{height:1, backgroundColor:'#E6E6E6'}} />
            <View style={{height: 40, justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row'}}>
              <Text style={{fontSize: 16, fontFamily: 'Avenir-Light'}}>Coming Soon:</Text>
                <View style={{ marginLeft:5, marginRight: 5,  height: 20, width:20, borderRadius: 20/2, backgroundColor: 'red'}}/>
                <View style={{ marginLeft:5, marginRight: 5,  height: 20, width:20, borderRadius: 20/2, backgroundColor: 'red'}}/>
                <View style={{ marginLeft:5, marginRight: 5,  height: 20, width:20, borderRadius: 20/2, backgroundColor: 'red'}}/>
            </View>
          </View>

          <SectionTitle title={'THEIR INTERESTS'}/>
          <View style={{height: 120, backgroundColor: 'white', justifyContent: 'center'}}>
            <View style={{justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row'}}>

              {/* Interest 1 */}
              <View style={{height:120, width:90, flexDirection: 'column'}}>
                <View style={{flex:.75, alignItems:'center', justifyContent: 'center'}}>
                  <View style={{width: 65, height: 65, borderRadius: 65/2, backgroundColor: 'orange'}} />
                  <View style={{position: 'absolute',top:5, left:5, width:23, height: 23, backgroundColor: 'white', borderRadius: 23/2, alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{width:20, height: 20, backgroundColor: 'orange', borderRadius: 23/2}} />
                  </View>
                </View>
                <View style={{flex:.25, alignItems: 'center'}}>
                  <Text style={{fontSize: 14, fontFamily: 'Avenir-Light'}}>Interest 1...</Text>
                </View>
              </View>

              {/* Interest 2 */}
              <View style={{height:120, width:90, flexDirection: 'column'}}>
                <View style={{flex:.75, alignItems:'center', justifyContent: 'center'}}>
                  <View style={{width: 65, height: 65, borderRadius: 65/2, backgroundColor: 'orange'}} />
                  <View style={{position: 'absolute',top:5, left:5, width:23, height: 23, backgroundColor: 'white', borderRadius: 23/2, alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{width:20, height: 20, backgroundColor: 'orange', borderRadius: 23/2}} />
                  </View>
                </View>
                <View style={{flex:.25, alignItems: 'center'}}>
                  <Text style={{fontSize: 14, fontFamily: 'Avenir-Light'}}>Interest 2...</Text>
                </View>
              </View>

            </View>
          </View>


          <SectionTitle title={'ABOUT ME'}/>
          <View style={{height: 100, backgroundColor: 'white'}}>
          </View>


          { /* Block User button */ }
          <Button>
          <View style={{marginTop: 20}}>
            <View style={{margin: 15, borderRadius: 5, borderWidth: 1, padding: 8, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: 14, fontFamily: 'Avenir-Light'}}>Block or Report this User</Text>
            </View>
          </View>
          </Button>

          <View style={styles.footer} />

        </ScrollView>
      </View>
    );
    }
    return null
  }
}


var styles = StyleSheet.create({
  footer:{
    height: 25, backgroundColor: '#E6E6E6'
  }
});

// maps action creator calls to a dispatch to update the tree
// Bind actions (dispatcher) to props
function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

// Match state to props which allows us to access actions
function mapStateToProps(state) {
  return {
    userDetail: state.viewingProfileDetail,
    isLoadingUser: state.isLoadingUser,
    currentLocation: state.currentLocation,
  }
}

// Connects the state variables to the property variables within the home class
export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetail)
