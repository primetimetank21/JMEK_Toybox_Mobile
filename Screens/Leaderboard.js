import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  FlatList,
  StatusBar,
} from 'react-native';

import * as firebase from 'firebase';
import 'firebase/firestore';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

class LeaderboardScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      mounted: true,
      myLeaderboard: undefined
    }
    this.userRef = firebase.firestore().collection('users');

  }

  getScores = () => {
    this.setState({ refreshing: true });

    this.unsubscribe = this.userRef.onSnapshot((onSnap) => {
      let leaderboardArray = [];
      onSnap.forEach((doc) => {
        leaderboardArray.push({
          username: doc.data().username,
          score: doc.data().points,
        });

      });
      console.log(leaderboardArray);
      this.setState({
        myLeaderboard: leaderboardArray.sort((a, b) => {
          return (a.score < b.score);
        }),
        loading: false,
      })

      this.state.mounted = true && this.unsubscribe();

    });

    this.setState({ refreshing: false });

  }

  render() {

    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <SafeAreaView style={{ alignItems: 'center' }}>
          <Text style={{ color: 'red' }}>Leaderboard Screen</Text>
          <View style={{ flex: 1, alignItems: 'center',/* justifyContent:'center'*/ }}>

            <Button title='See Leaderboard' onPress={() => this.getScores()} />

            {this.state.myLeaderboard !== undefined &&
              <FlatList
                data={this.state.myLeaderboard}
                renderItem={({ item, key, index }) => {
                  return (
                    <View
                      key={key}
                      index={index}
                      style={{
                        flex: 1,
                        width: 360,
                        flexDirection: 'column',
                        backgroundColor: 'red',
                      }}>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ color: 'white' }}>{index + 1}. {item.username}:</Text>
                        <Text style={{ color: 'white', paddingRight: 50 }}>{item.score}</Text>
                      </View>

                      <View style={{ height: 2, backgroundColor: 'blue' }} />
                    </View>
                  );
                }}
                keyExtractor={(item, index) => item.score}
              />
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

export default LeaderboardScreen;