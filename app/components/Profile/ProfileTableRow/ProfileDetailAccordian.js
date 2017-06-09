import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ListView,
  TouchableHighlight
} from 'react-native';

import Accordion from 'react-native-collapsible/Accordion';

import RowDivider from './RowDivider'
import BasicRow from './BasicRow'


export class SelectableList extends Component {
  constructor(props){
    super(props)
    // console.log()
    this.state = {
     dataSource: this.props.listItems,
     selected: this.props.selected
    };

  }

  selectItem(entryTitle){
    this.setState({selected: entryTitle})
    this.props.updateSelected({entryTitle})

  }

  _renderListItems(){
    console.log(this.state.dataSource)
    return this.state.dataSource.map((entryTitle, index)=>{
      return (
        <TouchableHighlight key={index} onPress={()=>this.selectItem(entryTitle)}>
          <View style={{paddingLeft: 20, backgroundColor: 'white'}}>

            {this.state.selected === entryTitle ?
              <View style={{height: 50, justifyContent:'center', alignItems: 'flex-end'}}>
                <View style={{marginRight: 10, backgroundColor:'skyblue', justifyContent: 'center', borderRadius: 35/2,  height: 35, paddingLeft: 10, paddingRight:10}}>
                  <Text style={{fontFamily: 'Avenir-Light', fontSize: 16}}>{entryTitle}</Text>
                </View>
              </View>
            :
              <View style={{height: 50, justifyContent:'center', alignItems: 'flex-end'}}>
              <View style={{padding:20, alignItems: 'flex-end'}}>
                <Text style={{fontFamily: 'Avenir-Light', fontSize: 16}}>{entryTitle}</Text>
              </View>
              </View>
            }


            <View style={{height:1, backgroundColor:'gray'}}/>
          </View>
        </TouchableHighlight>


      );
    })

  }

  render() {
    return (
      <View>
      {this._renderListItems()}
      </View>
    );
  }

}


export default class ProfileDetailAccordian extends Component {


  constructor(props){
    super(props)
    this.state = ({
      eduBackground: null,
      eduSelected: this.props.userProfile.scoopApiStore.schoolName
    })
  }

  componentDidMount(){
    this.setState({eduBackground: this.mapEduToArray()})
  }


  genSections = () => {
    return (
      [{
          rowItemName: 'School Name',
          eduBackgroundArr: this.state.eduBackground,
          selected: this.state.eduSelected,
          rowItemValue: this.state.eduSelected,
          updateSelected: (eduSelected) => {
            this.setState({eduSelected:(eduSelected.entryTitle)})

            // TODO: dispatch an update to the personal detail school name
          }
        },
        {
          rowItemName: 'Job Title',
          rowItemValue: 'Ask Me!',
        },
        {
          rowItemName: 'Height',
          rowItemValue: 'Ask Me!',
        },
        {
          rowItemName: 'Offspring',
          rowItemValue: 'Ask Me!',
        },
        {
          rowItemName: 'Body Type',
          rowItemValue: 'Ask Me!',
        }]
    );

  }




  _renderHeader(section) {
    return (
      <View style={{paddingLeft: 15, backgroundColor:'white'}}>
        <BasicRow rowItemName={section.rowItemName} rowItemValue={section.rowItemValue}/>
        <RowDivider />
      </View>
    );
  }


  mapEduToArray = () => {
    return this.props.userProfile.eduBackground.map((eduObject, index)=>{
      return (eduObject.school.name)

    })
  }

  _renderContent(section, index, isActive) {
    if(isActive === true){
      switch(section.rowItemName){
        case ("School Name"): {
            return (<SelectableList updateSelected={section.updateSelected} selected={section.selected} listItems={section.eduBackgroundArr}/>)
        }


      }
    }


    return (
      <View>
        <Text>TODO</Text>
      </View>
    );
  }


  render(){
    return (
        <Accordion
          sections={this.genSections()}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
        />

    );
  }

}
