import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableHighlight,
	Image,
	Dimensions,
	ListView
} from 'react-native';

import images from '@assets/images';
var servicesData = require('./services.json');

export default class ServiceSelection extends Component {
	constructor() {
		super();
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});


		const row1 = {
			imgUrl: images['airbnb_bgLogo']
		}
		const row2 = {
			imgUrl: images.audible_bgLogo
		}


		this.state = {
			dataSource: ds.cloneWithRows([row1, row2]),
		};
	}

	componentWillMount() {
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		var imgUrls = servicesData['service'].map((service) => {
			var serviceLower = service.background.toLowerCase();
			var url = `${serviceLower}_bgLogo`
			return { imgUrl: images[`${url}`] }
		})
		console.log(imgUrls)
		this.setState({
			dataSource: ds.cloneWithRows(imgUrls)
		})
	}


	render() {
		const width = Dimensions.get('window').width;
		const height = 140
		return(
			<View>
				<Text>
					HelloWorld
				</Text>
				<ListView 
					dataSource={this.state.dataSource}
					renderRow={(rowData) => <Image source={rowData.imgUrl} style={{width: width, height: height}} />}
				/>
			</View>
		)
	}
}