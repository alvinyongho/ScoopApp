import React, {Component} from 'react';
import ReactNative from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';

import { dateReducer } from '../../lib/dateFormat';


import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableHighlight,
  StyleSheet,
  Navigator,
  Dimensions,
  TextInput,
  Keyboard,
  Animated
} from 'react-native';

import MessageBubble from './MessageBubble';
import Button from 'react-native-button'

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


// TODO: rename to ChatDetailContainer
// uses redux state to populate the chat details based on the currently active "targetId" in messenger
export class ChatDetail extends Component{

  constructor(props){
    super(props)
    this.keyboardHeight = new Animated.Value(0);
  }

  componentWillMount () {

    // gets the thread content state
    this.props.getMessageThread()


    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow',
      this._keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide)

  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }



  _keyboardDidHide = (event) => {
    this.keyboardHeight.setValue(0)

  }

  _keyboardDidShow = (event) => {
    this.keyboardHeight.setValue(event.endCoordinates.height)

  };

  handleSend = () => {
    Keyboard.dismiss()
  }


  _mapThreadContentStateToMessageBubbles = () =>{
    let prevDate = -1 // will always be greater on initial date

    return this.props.threadContent.map((message, index)=>{
      let messageContent = (message.message)
      let senderIdMatchesSelf = (message.senderId === this.props.scoopUserId)

      // Boolean setter whether to display the date. Makes sure that the hours is different. 60 ms * 10000
      let displayDate = (Date.parse(message.sentDate) > prevDate + 60000) // Boolean
      if(displayDate)
        formattedSentDate = dateReducer(message.sentDate)

      prevDate = Date.parse(message.sentDate)

      return (
        <View key={index} style={index===(this.props.threadContent.length-1) && {paddingBottom: 50}}>
          {displayDate &&
            <View style={styles.datetimeContainer}>
              <Text style={styles.datetimeText}>{formattedSentDate}</Text>
            </View>
          }
          <MessageBubble isSelf={senderIdMatchesSelf} text={messageContent}/>
        </View>
      )
    })
  }

  componentWillUpdate(){
    this.msgListScrollView.scrollToEnd({animated:true})
    return false
  }

  render(){
    return(
      <Animated.View style={[styles.container, {paddingBottom: this.keyboardHeight}]}>
          <ScrollView ref={(scrollview)=>this.msgListScrollView=scrollview} style={styles.container}>
            {this._mapThreadContentStateToMessageBubbles()}
          </ScrollView>

          <View style={{backgroundColor:'#D1D1D1', height: 1}} />
          <View style={{backgroundColor:"#F0F0F0", flexDirection: 'row'}}>
          <TextInput placeholder={'Type message'}
            style={styles.inputTextBox} />


            <View style={{flex:.18, margin: 7, alignItems: 'center', justifyContent: 'center'}}>
              <Button onPress={this.handleSend}>
                <Text style={{fontSize: 20, fontFamily: 'Avenir', color:'#A2DDEE', fontWeight:'bold',}}>Send </Text>
              </Button>
            </View>
          </View>

      </Animated.View>

    )
  }
}


var styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'white',
  },
  inputTextBox:{
    flex: .82,
    borderRadius: 5,
    borderWidth: 1,
    fontFamily: 'Avenir-Light',
    margin: 7,
    height: 44,
    backgroundColor: 'white',
    borderColor: '#D1D1D1',
    paddingHorizontal: 10
  },
  datetimeContainer: {
    height: 30,
    marginTop: 20,
  },
  datetimeText: {
    textAlign:'center',
    color: '#888888'
  }
})



function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state){
  return {
    threadContent: state.messenger.threadContent,
    scoopUserId: state.scoopUserProfile.scoopId
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatDetail);
