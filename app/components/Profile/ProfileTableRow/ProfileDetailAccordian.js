import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ListView,
  Picker,
  TouchableHighlight
} from 'react-native';

import Accordion from 'react-native-collapsible/Accordion';

import RowDivider from './RowDivider'
import BasicRow from './BasicRow'



export class HeightPicker extends Component{
  constructor(props){
    super(props)
    this.state=({
      selectedHeightFeet: this.props.height.feet,
      selectedHeightInches: this.props.height.inches
    })
  }

  componentDidMount(){
    // this.setState({selectedHeightFeet: this.props.height.feet,
    //   selectedHeightInches: this.props.height.inches
    //             })

    console.log("HEIGHT FEET")
    console.log(this.props.height.feet)

  }

  updateSelected(feet, inches){

    this.props.updateSelected({feet, inches})
  }

  render(){
    return(
      <View style={{flex:1, flexDirection:'row'}}>
        <Picker style={{flex:.5}}
          selectedValue={this.state.selectedHeightFeet}
          onValueChange={(itemValue, itemIndex) => {
                                      this.setState({selectedHeightFeet: itemValue}, this.updateSelected(itemValue, this.state.selectedHeightInches))
                                      }}>
          <Picker.Item label="1'" value={1} />
          <Picker.Item label="2'" value={2} />
          <Picker.Item label="3'" value={3} />
          <Picker.Item label="4'" value={4} />
          <Picker.Item label="5'" value={5} />
          <Picker.Item label="6'" value={6} />
          <Picker.Item label="7'" value={7} />
          <Picker.Item label="8'" value={8} />
        </Picker>

        <Picker style={{flex:.5}}
          selectedValue={this.state.selectedHeightInches}
          onValueChange={(itemValue, itemIndex) => {
                                    this.setState({selectedHeightInches: itemValue}, this.updateSelected(this.state.selectedHeightFeet, itemValue))
                                    }}>

          <Picker.Item label="1&#34;" value={1} />
          <Picker.Item label="2&#34;" value={2} />
          <Picker.Item label="3&#34;" value={3} />
          <Picker.Item label="4&#34;" value={4} />
          <Picker.Item label="5&#34;" value={5} />
          <Picker.Item label="6&#34;" value={6} />
          <Picker.Item label="7&#34;" value={7} />
          <Picker.Item label="8&#34;" value={8} />
          <Picker.Item label="9&#34;" value={9} />
          <Picker.Item label="10&#34;" value={10} />
          <Picker.Item label="11&#34;" value={11} />
        </Picker>
      </View>
    );
  }

}

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
      eduSelected: this.props.userProfile.scoopApiStore.schoolName,
      height: this.computeHeightFromAPIStore()
    })
  }


  computeHeightFromAPIStore(){
    height_inches = this.props.userProfile.scoopApiStore.heightInches
    ft = Math.floor(height_inches/12)
    inches = height_inches-(ft*12)
    console.log("HEIGHT COMPUTED INTO STATE")
    return(
      {
          feet: ft,
          inches: inches
      }
    )
  }


  componentDidMount(){

    // this.computeHeightFromAPIStore()
    // console.log("THe users height")
    // console.log(this.props.userProfile.scoopApiStore.heightInches)
    //


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
          height: this.state.height,
          rowItemValue: `${this.state.height.feet}' ${this.state.height.inches}"`,
          updateSelected: (heightSelected) => {
            console.log("THE HEIGHT SELECTED")
            console.log(heightSelected)
            this.setState({height: {
                                      feet: heightSelected.feet,
                                      inches: heightSelected.inches
                                    }
                          })
          }
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
        case("Height"): {
            return (
              <HeightPicker updateSelected={section.updateSelected} height={section.height}/>
            )
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
