import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
} from 'react-native';

import images from '@assets/images';


export default class HistoryCollection extends Component{

  constructor(props){
    super(props)
  }

  getRandomColor=()=>{
    colors = ['#54C9EC', '#7BEC54', '#EC54CC', '#54A5EC', '#BD54EC']
    min = 0
    max = 4
    randId = Math.floor(Math.random() * (max - min + 1)) + min;
    return colors[randId]
  }

  getRandomPlaceholder=()=>{
    min = 1
    max = 6
    randId = Math.floor(Math.random() * (max - min + 1)) + min;

    key = 'historyPlaceholder' + randId
    return images[key]

  }



  _renderCell = () => {
      return (
        <View style={styles.cellItemContainer}>
          <View>
            <TouchableHighlight underlayColor='transparent' onPress={()=>console.log('todo')} style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image resizeMode='contain' source={this.getRandomPlaceholder()}  style={[styles.UserBubble, {borderColor:this.getRandomColor()}]}/>
            </TouchableHighlight>
            <View style={styles.UserInfoContainer}>
              <Text style={styles.UsersNameText}>Alexander</Text>
              <Text style={styles.UserAddedDate}>Matched on Feb 24</Text>
            </View>
          </View>
        </View>
      )
  }

  _renderCellRow = () => {
    return (
      <View style={styles.cellRowContainer}>
          {this._renderCell()}
          {this._renderCell()}
          {this._renderCell()}
      </View>
    )
  }

  render(){
    return(
      <View>

            <View style={styles.headerContainer} >
              <Text style={styles.headerText}>YOUR INTERESTS</Text>
            </View>

            <View style={styles.collectionContainer}>
                {this._renderCellRow()}
                {this._renderCellRow()}
            </View>
      </View>
    )
  }

}


var styles = StyleSheet.create({
  collectionContainer: {
    backgroundColor: 'white',
    height: 340,
  },
  headerContainer: {
    // backgroundColor: '#F2F2F2',
    height: 50,
    alignItems: 'flex-start',
    justifyContent: 'center',
    left: 22,
    top: 5
  },
  headerText: {
    fontFamily: 'Avenir-Light',
    fontSize: 12
  },


  UserInfoContainer: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10},
  UsersNameText: {
    fontFamily: 'Avenir-Light',
    fontSize: 11,
  },
  UserAddedDate: {
    fontFamily: 'Avenir-Light',
    color: 'gray',
    fontSize: 11
  },
  cellRowContainer: {
    height: 140,
    flexDirection: 'row',
    marginTop: 20,
    padding: 10,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginBottom: 0
  },
  cellItemContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    // justifyContent: 'center',
    justifyContent: 'center'
  },
  UserBubble: {
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    height: 90,
    width: 90,
    backgroundColor: '#A5A5A5',
    borderWidth: 1.25,
    // borderColor: 'skyblue'
  },

})
