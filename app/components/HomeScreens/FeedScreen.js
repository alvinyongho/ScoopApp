import React, { PropTypes } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

const FeedScreen = ({ dispatch }) => (
  <View style={styles.container}>
    <Text> Home Feed Would be here </Text>

    <Button
        onPress={() => dispatch(NavigationActions.navigate({ routeName: 'Profile' }))}
        title="Profile"
      />
  </View>
);

FeedScreen.navigationOptions = {
  title: 'Scoop Feed Screen',
};



FeedScreen.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(FeedScreen);
