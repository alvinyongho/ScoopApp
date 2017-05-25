import React, {Component} from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';
import { NavigationActions } from 'react-navigation';

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

import Button from 'react-native-button';


var swipeoutBtns = [
  {
    component: <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}><Text style={{fontSize: 14, fontFamily: 'Avenir-Light', color: 'white'}}>Delete</Text></View>,
    backgroundColor: 'red',
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


class AllChatsListRow extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      rightTransformAmount: new Animated.Value(0),
    };
  }

  getRowStyle = () => {left: this.state.rightTransformAmount}

  componentDidMount(){
    if(this.props.editMessages){
      Animated.spring(
        this.state.rightTransformAmount,
        {
          toValue: 40,
        }
      ).start();
    }
  }

  componentWillUpdate(nextProps, nextState){
    if(!this.props.editMessages){
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
  }

  renderCell = () => (
    <Animated.View style={{...this.props.style, left: this.state.rightTransformAmount}}>
      <View style={styles.container}>
        <View style={{margin: 15, alignItems:'center', justifyContent: 'center'}}>
          <View style={{height: 20,
              width: 20,
              borderRadius:20/2,
              backgroundColor:'white',
              borderColor: '#AFAFAF',
              borderWidth: 1}} />
        </View>
        <View style={{ height: this.props.pictureSize,
                       width: this.props.pictureSize,
                       borderRadius:this.props.pictureSize/2,
                       backgroundColor:'skyblue'}} />
        <View style={styles.nameMessageContainer}>
          <Text style={styles.otherPersonName}>
            {this.props.rowData}
          </Text>

          <Text style={styles.mostRecentMessageText}>
            Most recent message
          </Text>
        </View>
        <Text style={styles.dateColumn}>
          8:10 pm
        </Text>
      </View>
      <View style={{height:1, left: -SHIFT_AMOUNT, width: (screenWidth + SHIFT_AMOUNT), backgroundColor:'#FAFAFA'}}/>
    </Animated.View>
  );

  renderCellWithHighlight = () => (
    <Swipeout right={swipeoutBtns} backgroundColor={'red'}>
    <TouchableHighlight onPress={()=>this.props.chatDetail()}>
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

const mapDispatchToProps = dispatch => ({
  chatDetail: () => dispatch(NavigationActions.navigate({ routeName: 'ChatDetail' })),
})

function mapStateToProps(state){
  return {
    editMessages: state.editMessages
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(AllChatsListRow);