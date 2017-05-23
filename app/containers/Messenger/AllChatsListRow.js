import React, {Component} from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ActionCreators } from '../../actions';

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

import Button from 'react-native-button';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20,
    backgroundColor:'white',
    flexDirection: 'row',
    width: screenWidth + 60,
    left: -60,
  },
  otherPersonName:{
    fontSize:20,
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
        <View style={{margin: 20, alignItems:'center', justifyContent: 'center'}}>
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
      <View style={{height:1, left: -60, width: (screenWidth + 60), backgroundColor:'#FAFAFA'}}/>
    </Animated.View>
  );

  renderCellWithHighlight = () => (
    <TouchableHighlight onPress={()=>console.log("test")}>
      {this.renderCell()}
    </TouchableHighlight>
  );

  render(){
    if(!this.props.editMessages){
      return this.renderCellWithHighlight()
    }

    return this.renderCell()
  }

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state){
  return {
    editMessages: state.editMessages
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllChatsListRow);
