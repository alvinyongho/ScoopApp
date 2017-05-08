'use strict';

import React, {Component} from 'react'


import {
  View,
  Text,
  ScrollView, StyleSheet
} from 'react-native';


import SortableGrid from './react-native-sortable-grid'



export default class SortableAlbum extends React.Component {

  getColor() {
    let r = this.randomRGB()
    let g = this.randomRGB()
    let b = this.randomRGB()
    return 'rgb(' + r + ', ' + g + ', ' + b + ')'
  }
  randomRGB = () => 160 + Math.random()*85

  render(){
    return (
      <View>

        {/* <EditPhotoAlbum /> */}
        <SortableGrid
          itemsPerRow                  = { 3 }
          dragActivationTreshold       = {400}
          hasMainBlock = {true}
        >
          {
            ['a', 'b', 'c', 'd', 'e', 'f'].map( (letter, index) =>


              <View key={index} style={[styles.block, { backgroundColor: this.getColor() }]}>
                <Text>{letter}</Text>
              </View>

            )
          }
        </SortableGrid>


      </View>
    )
  }

}


const styles = StyleSheet.create({
  bigBlock: {
    height: 200,
    margin: 8,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  block: {
    flex: 1,
    margin: 8,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },


});
