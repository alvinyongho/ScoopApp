import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

const ProfileScreen = () => (
  <View style={styles.container}>
    <Text> Profile Detail Would be here </Text>
  </View>
);

ProfileScreen.navigationOptions = {
  title: 'Scoop Feed Screen',
};

export default ProfileScreen;
