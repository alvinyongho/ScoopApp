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
                          this.setState({selectedHeightFeet: itemValue},
                            this.updateSelected(itemValue, this.state.selectedHeightInches))
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
      eduSelected: "",
      height: {
                  feet: 0,
                  inches: 0
              },
      offSpringSelected: "",
      bodyTypeSelected: "",
      jobTitleSelected: "",
    })
  }

  convertHeightToStoreFormat(height_inches){
    ft = Math.floor(height_inches/12)
    inches = height_inches-(ft*12)
    return(
      {
          feet: ft,
          inches: inches
      }
    )
  }

  offspringToStore(offspring_val){
    switch(offspring_val){
      case "0":
        return "Do not share"
      case "1":
        return "I have kids"
      case "2":
        return "I do not have kids"
      default:
        return "undefined"
    }
  }

  bodytypeToStore(bodytype_val){
    switch(bodytype_val){
      case "0":
        return "Ask me!"
      case "1":
        return "Slender"
      case "2":
        return "Athletic"
      case "3":
        return "Average"
      case "4":
        return "Full Figured"
      case "5":
        return "More to Love"
      default:
        return "undefined"
    }
  }

  componentWillReceiveProps(nextProps){
    // School name
    retrievedFromAPISchoolName = nextProps.userProfile.scoopApiStore.schoolName
    if(retrievedFromAPISchoolName && (retrievedFromAPISchoolName !== this.state.eduSelected)){
      this.setState({eduSelected: retrievedFromAPISchoolName})
    }
    // Job Title
    retrievedFromAPIJobTitle = nextProps.userProfile.scoopApiStore.jobTitle
    if(retrievedFromAPIJobTitle && (retrievedFromAPIJobTitle !== this.state.jobTitleValue)){
      this.setState({jobTitleSelected: retrievedFromAPIJobTitle})
    }
    // Height
    retrievedFromAPIHeight = nextProps.userProfile.scoopApiStore.heightInches
    heightStoreFormat = this.convertHeightToStoreFormat(retrievedFromAPIHeight)
    if(heightStoreFormat && (heightStoreFormat != this.state.height)){
      this.setState({height: heightStoreFormat})
    }
    // Offspring
    offspringFromAPI = nextProps.userProfile.scoopApiStore.offspring
    offspringStoreFormat = this.offspringToStore(offspringFromAPI)
    if(offspringStoreFormat && (offspringStoreFormat != this.state.offSpringSelected)){
      this.setState({offSpringSelected: offspringStoreFormat})
    }
    // Body Type
    bodytypeFromAPI = nextProps.userProfile.scoopApiStore.bodyType
    bodytypeStoreFormat = this.bodytypeToStore(bodytypeFromAPI)
    if(bodytypeStoreFormat && (bodytypeStoreFormat != this.state.bodyTypeSelected)){
      this.setState({bodyTypeSelected: bodytypeStoreFormat})
    }
  }


  componentDidMount(){
    this.setState({eduBackground: this.mapEduToArray()})
  }

  genSections = () => {
    const offspringChoices = ["I have kids", "I do not have kids", "Do not share"]
    const bodyTypeChoices = ["Slender", "Athletic", "Average", "Full Figured", "More to Love", "Do not share"]

    getApiIndexOfChoiceSelected = (choices, selected) => {
      if(selected=== "Do not share")
        return 0
      return choices.indexOf(selected)+1
    }

    return (
      [{
          rowItemName: 'School Name',
          eduBackgroundArr: this.state.eduBackground,
          eduSelected: this.state.eduSelected,
          rowItemValue: this.state.eduSelected,
          updateSelected: (eduSelected) => {
            this.props.saveSetting({'education': eduSelected.entryTitle})
            this.setState({eduSelected:(eduSelected.entryTitle)})
          }
        },
        {
          rowItemName: 'Job Title',
          jobTitlesArr: [],
          rowItemValue: this.state.jobTitleSelected,
          updateSelected: (jobTitleSelected) => {
            console.log("jobTitleSelected")
            console.log(jobTitleSelected)
            this.setState({jobTitleSelected:(jobTitleSelected.entryTitle)})
          }
        },
        {
          rowItemName: 'Height',
          height: this.state.height,
          rowItemValue: `${this.state.height.feet}' ${this.state.height.inches}"`,
          updateSelected: (heightSelected) => {
            this.props.saveSetting({'heightInches': heightSelected.feet*12+heightSelected.inches})
            this.setState({
              height: {
                feet: heightSelected.feet,
                inches: heightSelected.inches
              }
            })
          }
        },
        {
          rowItemName: 'Offspring',
          offspringArr: offspringChoices,
          rowItemValue: this.state.offSpringSelected,
          updateSelected: (offspringSelected) => {
            indexSelected = getApiIndexOfChoiceSelected(offspringChoices, offspringSelected.entryTitle)
            this.props.saveSetting({'offspring': indexSelected})
            this.setState({offSpringSelected:(offspringSelected.entryTitle)})
          }
        },
        {
          rowItemName: 'Body Type',
          values: bodyTypeChoices,
          rowItemValue: this.state.bodyTypeSelected,
          updateSelected: (bodyTypeSelected) => {
            indexSelected = getApiIndexOfChoiceSelected(bodyTypeChoices, bodyTypeSelected.entryTitle)
            this.props.saveSetting({'bodyType': indexSelected})
            this.setState({bodyTypeSelected:(bodyTypeSelected.entryTitle)})
          }
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
    if(this.props.userProfile.eduBackground == undefined){
      return []
    }
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
        case("Job Title"): {
          return(<SelectableList updateSelected={section.updateSelected} selected={section.selected} listItems={section.jobTitlesArr}/>)
        }
        case("Height"): {
          return (
            <HeightPicker updateSelected={section.updateSelected} height={section.height}/>
          )
        }
        case("Offspring"): {
          return(<SelectableList updateSelected={section.updateSelected} selected={section.selected} listItems={section.offspringArr}/>)
        }
        case("Body Type"): {
          return(<SelectableList updateSelected={section.updateSelected} selected={section.selected} listItems={section.values}/>)
        }
      }
    }
    return null
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
