import React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

const FilterScreen = () => (
  <View style={styles.container}>
    <Text> Filter Would be here </Text>
  </View>
);

FilterScreen.navigationOptions = {
  title: 'Scoop Feed Screen',
};

export default FilterScreen;
