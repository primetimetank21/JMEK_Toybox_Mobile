import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

class HomeScreen extends React.Component {
  render() {

  return (
    <View style={{ flex:1, alignItems: 'center' }}>
      <SafeAreaView style={{ alignItems:'center' }}>
        <Text style={{ color:'red' }}>Home Screen</Text>
        <Button title='To Login' onPress={() =>  this.props.navigation.navigate('Login')} />
        <Button title='To Leaderboard' onPress={() =>  this.props.navigation.navigate('Leaderboard')} />
        <Button title='To GameType' onPress={() =>  this.props.navigation.navigate('GameType')} />
      </SafeAreaView>
      </View>
  );
}
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default HomeScreen;