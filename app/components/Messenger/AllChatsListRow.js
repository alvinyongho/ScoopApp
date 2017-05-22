import React, {Component} from 'react'

import {
  View,
  Text,
  ListView,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';

import Button from 'react-native-button';

const screenWidth = Dimensions.get('window').width;

const pictureSize = 60;

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:20,
    backgroundColor:'white',
    flexDirection: 'row'

  },
  otherPersonName:{
    fontSize:20,
  },

  nameMessageContainer: {
    flex:1,
    flexDirection: 'column',
    marginLeft: 15
  },

  mostRecentMessageText: {
    color:'#666666',

  },

  dateColumn: {
    color:'#999999',

  }
})



const AllChatsListRow = (props) => (
  <View>
  <Animated.View style={styles.container}>
    <View style={{height: pictureSize, width: pictureSize, borderRadius:pictureSize/2, backgroundColor:'skyblue'}} />

    <View style={styles.nameMessageContainer}>
      <Text style={styles.otherPersonName}>
        {props.rowData}
      </Text>

      <Text style={styles.mostRecentMessageText}>
        Most recent message
      </Text>
    </View>

    <Text style={styles.dateColumn}>
      8:10 pm
    </Text>


  </Animated.View>
  <View style={{height:1, width: (screenWidth), backgroundColor:'#FAFAFA'}}/>
  </View>

);


export default AllChatsListRow
