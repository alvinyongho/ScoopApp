import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';

import Accordion from 'react-native-collapsible/Accordion';

import RowDivider from './RowDivider'
import BasicRow from './BasicRow'

const SECTIONS = [
  {
    rowItemName: 'School Name',
    rowItemValue: 'University of California, San...',
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
  }
];


export default class ProfileDetailAccordian extends Component {
  constructor(props){
    super(props)
  }

  _renderHeader(section) {
    return (
      <View style={{paddingLeft: 15, backgroundColor:'white'}}>
        <BasicRow rowItemName={section.rowItemName} rowItemValue={section.rowItemValue}/>
        <RowDivider />
      </View>
    );
  }

  _renderContent(section) {
    return (
      <View>
        <Text>TODO</Text>
      </View>
    );
  }


  // <RowDivider />
  // <BasicRow rowItemName={'Job Title'} />
  // <RowDivider />
  // <BasicRow rowItemName={'Height'} rowItemValue={'Ask Me!'}/>
  // <RowDivider />
  // <BasicRow rowItemName={'Offspring'} rowItemValue={'Ask Me!'}/>
  // <RowDivider />
  // <BasicRow rowItemName={'Body Type'} rowItemValue={'Ask Me!'}/>

  render(){
    return (
        <Accordion
          sections={SECTIONS}
          renderHeader={this._renderHeader}
          renderContent={this._renderContent}
        />

    );
  }

}
