import React, {Component} from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { NavigationActions } from 'react-navigation';
import { dateReducer } from '../../lib/dateFormat';

import {
  View,
  Text,
  ListView,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableHighlight
} from 'react-native';

import Swipeout from 'react-native-swipeout'
import Button from 'react-native-button'




var swipeoutBtns = (deleteItem) => [
  {
    component: <View style={{flex:1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red'}}><Text style={{fontSize: 14, fontFamily: 'Avenir-Light', color: 'white'}}>Delete</Text></View>,
    backgroundColor: 'red',
    onPress: () => {
      // console.log(`clicked on ${cellId}`)
      deleteItem()
    }
  }
]

const SHIFT_AMOUNT = 50


const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  wrapper: {
  },
  container:{
    flex:1,
    padding:10,
    backgroundColor:'white',
    flexDirection: 'row',
    width: screenWidth + SHIFT_AMOUNT,
    left: -SHIFT_AMOUNT,
  },
  otherPersonName:{
    fontSize:16,
  },
  nameMessageContainer: {
    flex:1,
    flexDirection: 'column',
    marginLeft: 15,
  },
  mostRecentMessageText: {
    color:'#666666',

  },
  dateColumn: {
    color:'#999999',

  }
})


class MessageListRowItem extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      rightTransformAmount: new Animated.Value(0),
      markedForDeletion: false,
      animatableHeight: new Animated.Value(70),
      isAnimatedHeight: true,
      removing: false,
      isRemoved: false,
      rowData: this.props.rowData,
      isUnread: 0,
    };
  }

  // stateMarkedForDeletion = () =>{
  //   // usersMarked = this.props.itemsMarkedForDeletion
  //   //
  //   // if (usersMarked.contains(this.props.rowData.userId)){
  //   //   console.log("YES YES")
  //   // }
  //
  //   return false
  // }

  getRowStyle = () => {left: this.state.rightTransformAmount}

  componentDidMount(){

  }

  componentWillReceiveProps(nextProps){

    if(nextProps.editMessages){
      Animated.spring(
        this.state.rightTransformAmount,
        {
          toValue: 40,
        }
      ).start();
    } else {
      Animated.timing(
        this.state.rightTransformAmount,
        {
          toValue: 0,
          duration: 100,
        }
      ).start();
    }

    if(nextProps.itemsMarkedForDeletion.length === 0){
      this.setState({markedForDeletion: false})

      // this.resetHeight()
    }


    if(this.state.rowData.targetId !== nextProps.rowData.targetId){
      console.log("THE ROW DATA HAS CHANGED")


      isFullSizeCell = false
      // Taking the updated message list after we removed the item
      nextProps.messageList.map((messageItem, index)=>{

        // for each item in message list that we computed from removing the item
        // if the row data exists then it must be fully sized
        if (messageItem.targetId === nextProps.rowData.targetId){
          isFullSizeCell = true
        }
      })

      if(isFullSizeCell){
        this.resetHeight()
      }

    }


    if(nextProps.rowData.isUnread != this.state.isUnread){
      this.setState({isUnread: Number(nextProps.rowData.isUnread)})
    }

  }

  componentWillUpdate(nextProps, nextState){
    if(nextState.removing == true){
      console.log("received state of removing")
      this.onRemove(() => {


        setTimeout(()=>{
          this.props.hideMessages()

        }, 1000)




      })


      this.setState({
        removing: false
      })
    }

  }

  toggleDeletion(){

    isMarkedForDeletion = !this.state.markedForDeletion
    this.setState({markedForDeletion:isMarkedForDeletion})

    if(isMarkedForDeletion){
      console.log("cell is toggled for deletion")
      this.props.cellToggledForDeletion()
    }
    else {
      console.log("undid cell toggle for deletion")
      this.props.cellCanceledForDeletion()
    }

  }

  onRemove(callback){
    Animated.timing(this.state.animatableHeight, {
      toValue: 0,
      duration: 200
    }).start(callback);
  }

  resetHeight(){
    Animated.timing(this.state.animatableHeight, {
      toValue: 70,
      duration: 0
    }).start()
  }

  handleRemoval = () => {
    console.log("handling removal")
    this.setState({removing: true})
  }

  componentWillUnmount(){
    this.setState({rowData: null})
  }

  handlePreviewUser = () => {
    console.log("previwing user!")
    this.props.fetchUser(this.props.rowData.targetId);
    this.props.goToMessengerPreviewProfile();
    this.props.resetFeedRoutes();
    this.props.resetProfileTabRouterAC();
  }

  _renderRowDataPicture = () => {
    return(
      <TouchableHighlight onPress={() => this.handlePreviewUser()} underlayColor="transparent">
      <View>

      <View style={{ position: 'absolute',
                      height: this.props.pictureSize,
                       width: this.props.pictureSize,
                       borderRadius:this.props.pictureSize/2, backgroundColor: '#EFEFEF'
                       }} />

      {this.props.rowData.picURL != "" ?
        <Image source={{uri:this.props.rowData.picURL}}
                style={{height: this.props.pictureSize,
                       width: this.props.pictureSize,
                       borderRadius:this.props.pictureSize/2,
                       }}
        />
        :
        <View style={{ height: this.props.pictureSize,
                         width: this.props.pictureSize,
                         borderRadius:this.props.pictureSize/2, backgroundColor: '#EFEFEF'
                         }} />
      }
      </View>
      </TouchableHighlight>
      )
  }

  renderCell = () => (
    <Animated.View style={
      [{...this.props.style, left: this.state.rightTransformAmount},
        this.state.isAnimatedHeight &&
        {height: this.state.animatableHeight}
      ]}>
      <View style={styles.container}>
        <View style={{margin: 15, alignItems:'center', justifyContent: 'center'}}>

          <TouchableHighlight underlayColor='white' onPress={()=>this.toggleDeletion()}>


          {this.state.markedForDeletion ?
          <View style={{height: 20,
              width: 20,
              borderRadius:20/2,
              backgroundColor:'white',
              borderColor: 'red',
              borderWidth: 1, alignItems:'center', justifyContent:'center'}}>
            <View style={{alignItems:'center', justifyContent:'center'}}>
              <View style={{position: 'absolute', height:1, backgroundColor: 'red', width: 15, transform: [{ rotate: '45deg'}]}}/>
              <View style={{position: 'absolute', height:1, backgroundColor: 'red', width: 15, transform: [{ rotate: '-45deg'}]}}/>

            </View>

          </View>
          :
          <View style={{height: 20,
              width: 20,
              borderRadius:20/2,
              backgroundColor:'white',
              borderColor: '#AFAFAF',
              borderWidth: 1}} />


          }
          </TouchableHighlight>
        </View>



        {this._renderRowDataPicture()}

        <View style={styles.nameMessageContainer}>
          {this.state.isUnread ? 
            <View>
              <Text style={[styles.otherPersonName, {fontWeight: 'bold'}]}>
                {this.props.rowData.name}
              </Text>
              <Text style={[styles.mostRecentMessageText, {fontWeight: 'bold', color:"black"}]}>
                {this.props.rowData.message}
              </Text>
            </View>
            :
            <View>
              <Text style={styles.otherPersonName}>
                {this.props.rowData.name}
              </Text>
              <Text style={styles.mostRecentMessageText}>
                {this.props.rowData.message}
              </Text>
            </View>
          }
        </View>
        {this.props.rowData.length &&
          <Text style={styles.dateColumn}>
            {dateReducer(this.props.rowData.date)}
          </Text>
        }
      </View>
      <View style={{height:1, left: -SHIFT_AMOUNT, width: (screenWidth + SHIFT_AMOUNT), backgroundColor:'#FAFAFA'}}/>
    </Animated.View>
  );

  _onCellPress = () => {
    this.props.setMessageTarget(this.props.rowData.targetId)
    // Navigate to chat details
    this.props.resetFeedRoutes()  // prevents multiple chats opened
    this.props.goToChatDetail()
  }


  _deleteItem = (targetId) => {
    console.log('deleting ' + targetId)
    this.props.setIdsMarkedForDeletion([targetId])
    this.handleRemoval()
    // this.props.hideMessages()
  }


  renderCellWithHighlight = () => (
    <Swipeout scroll={(isEnabled) => this.props.changeScrollState(isEnabled)} right={swipeoutBtns( ()=> this._deleteItem(this.props.rowData.targetId))} backgroundColor={'white'} autoClose={true}>
    <TouchableHighlight onPress={()=>this._onCellPress()}>
      {this.renderCell()}
    </TouchableHighlight>
    </Swipeout>
  );

  render(){
    if(!this.props.editMessages){
      return this.renderCellWithHighlight()
    }
    return this.renderCell()
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state){
  return {
    editMessages: state.editMessages,
    itemsMarkedForDeletion: state.messenger.userIdsMarkedForDeletion,
    messageList: state.messenger.messageList
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(MessageListRowItem);
