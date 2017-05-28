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

  render() {
    return(
      <View style={{backgroundColor:'#E6E6E6'}}>
        <ScrollView scrollEnabled={this.state.isScrollEnabled}>
          {this.props.userDetail.images && 
            <ProfileAlbum 
              images={this.props.userDetail.images} 
              changeScrollState={this.changeScrollState}
            />
          }
            
          <ProfileBasicInfo />
          <SendMessageButton />

          <View style={{paddingTop: 10, paddingLeft: 15, backgroundColor: 'white'}}>
            <BasicRow rowItemName={'Height'} rowItemValue={<Text>5&#39; 6&#34;</Text>}/>
            <RowDivider />
            <BasicRow rowItemName={'Job Title'}/>
            <RowDivider />
            <BasicRow rowItemName={'Height'} rowItemValue={<Text>Ask me!</Text>}/>
            <RowDivider />
            <BasicRow rowItemName={'Offspring'} rowItemValue={<Text>Ask me!</Text>}/>
            <RowDivider />
            <BasicRow rowItemName={'Body Type'} rowItemValue={<Text>Ask me!</Text>}/>
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
    userDetail: state.viewingProfileDetail
  }
}

// Connects the state variables to the property variables within the home class
export default connect(mapStateToProps, mapDispatchToProps)(ProfileDetail)


