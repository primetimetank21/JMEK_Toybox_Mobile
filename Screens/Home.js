import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Alert,
  Button,
  StatusBar,
} from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';

import {SearchBar, Avatar, ListItem} from 'react-native-elements';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

const list = [
  {
    name: 'U.S. Colleges',

  },
  {
    name: 'Foreign Language',
    avatar_url: 'https://www.freepik.com/free-icon/earth_723334.htm'
  },
  {
    name: 'Soccer',
    avatar_url: 'https://www.freepik.com/free-icon/earth_723334.htm'
  },
  {
    name: 'The Beatles',
    avatar_url: 'https://www.freepik.com/free-icon/earth_723334.htm'
  }
]
const list2 = [
  {
    name: 'Kingdom Hearts',

  },
  {
    name: 'Italian Food',
    avatar_url: 'https://www.freepik.com/free-icon/earth_723334.htm'
  },
  {
    name: 'Holidays',
    avatar_url: 'https://www.freepik.com/free-icon/earth_723334.htm'
  },
  {
    name: 'K-Pop',
    avatar_url: 'https://www.freepik.com/free-icon/earth_723334.htm'
  },
  {
    name: 'Britney Spears',
    avatar_url: 'https://www.freepik.com/free-icon/earth_723334.htm'
  }
]
class HomeScreen extends React.Component {

  render() {

  return (
    <View style={{ flex:1 }}>

      <SafeAreaView>

      <View style={{alignItems:'center', marginTop: 75}}>
      <Text style={{fontSize: 30, fontFamily: 'Avenir-Heavy'}}>Most Popular Categories</Text>
      </View>
      <View>

        {
          list.map((l, i) => (
            <ListItem
              key={i}
              leftAvatar={{ source: { uri: l.avatar_url } }}
              title={<Text>{l.name}</Text>}
              subtitle={l.subtitle}
              bottomDivider
            />
          ))
        }
      </View>
      <View style={{alignItems:'center', marginTop: 10}}>
      <Text style={{fontSize: 30, fontFamily: 'Avenir-Heavy'}}>Recently Added Categories</Text>
      </View>
      <View>

        {
          list2.map((l, i) => (
            <ListItem
              key={i}
              leftAvatar={{ source: { uri: l.avatar_url } }}
              title={<Text>{l.name}</Text>}
              subtitle={l.subtitle}
              bottomDivider
            />
          ))
        }
      </View>

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
