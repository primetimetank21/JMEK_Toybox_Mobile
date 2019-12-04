import React from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View} from 'react-native';
import {Header, Left, Body, Title, Right} from 'native-base';
import * as firebase from 'firebase';
import 'firebase/firestore';

import {Avatar, ListItem} from 'react-native-elements';
import {CardList} from './Components/CardList';
import {Colors} from 'react-native/Libraries/NewAppScreen';
// import { Header } from 'react-navigation-stack';

const list = [
  {
    title: 'Cars',
    picture: require('../images/cars.jpeg'),
  },
  {
    title: 'Food',
    picture: require('../images/food.jpeg'),
  },
  {
    title: 'Foreign Language ',
    picture: require('../images/foreign_language.jpeg'),
  },
  {
    title: 'Holidays',
    picture: require('../images/holidays.jpeg'),
  },
  {
    title: 'Music',
    picture: require('../images/music.jpeg'),
  },
  {
    title: 'Soccer',
    picture: require('../images/soccer.jpeg'),
  },
  {
    title: 'Movies',
    picture: require('../images/college.jpeg'),
  },
  {
    title: 'Video Games',
    picture: require('../images/video_games.jpeg'),
  },
];

class HomeScreen extends React.Component {
  render() {
    return (
      <SafeAreaView
        style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
        <View
          style={{
            flex: 0.05,
            flexDirection: 'row',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: 30,
          }}>
          <Body style={{justifyContent: 'center'}}>
            <Title style={styles.font}>Home</Title>
          </Body>

          <Right style={{}}>
            <Avatar //style={{ flex:1 }}
              rounded
              medium
              title="Prof"
              onPress={() => this.props.navigation.navigate('Profile')}
            />
          </Right>
        </View>

        <ScrollView style={{flex: 1}}>
          <View>
            <CardList navigation={this.props.navigation} cards={list} />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default HomeScreen;

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
  font: {
    fontFamily: 'Avenir-Medium',
    fontSize: 20,
  },
  header: {
    width: 370,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
