/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { SafeAreaView, FlatList, ScrollView, View, Text, Button, TouchableOpacity, Alert, TextInput } from 'react-native';
import { Avatar, Card } from 'react-native-elements';
import { Header, Left, Body } from 'native-base';
import { NavigationActions } from 'react-navigation'

import * as firebase from 'firebase';
import 'firebase/firestore';

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reload: true,
      reloadCount: 0,
      change: false,
      username: '',
      topScores: [],
      myChallenges: [],
      newUsername: '',
      userRef: firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid),
      thanosSnap: null
    }
  };

  changeUsername = () => {
    this.setState({ change: !this.state.change })
  };

  updateUsername = () => {
    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).update({
      username: this.state.newUsername,
    })

    this.setState({ username: this.state.newUsername })
    this.setState({ newUsername: '' })
    this.setState({ change: !this.state.change })
  };

  updatePassword = () => {
    firebase.auth().sendPasswordResetEmail(firebase.auth().currentUser.email)
      .then(() => {
        Alert.alert("Password reset email has been sent.");
      }, (error) => {
        Alert.alert(error.message);
      })
  };

  deleteAccount = () => {
    var user = firebase.auth().currentUser;
    firebase.firestore().collection('users').doc(user.uid).delete().then(() => {
      user.delete();
    }).then(() => {
      Alert.alert('User deleted.');
      setTimeout(() => {
        firebase.auth().signOut().then(() => { this.props.navigation.reset([NavigationActions.navigate({ routeName: 'Login' })], 0) })
      }, 100)

    })
  };

  _refresh = async () => {
    this.unsubscribe2 = this.state.userRef.collection('my challenges').get().then((snapShot) => {
      snapShot.forEach(doc => {
        console.log(doc.id)
        this.state.myChallenges.push(doc.id);
      });
    });

  };

  componentDidMount() {
    if (this.state.reload === true) {
      let name = '';
      let arr = [];
      this.unsubscribe = firebase.firestore().collection('users').onSnapshot((onSnap) => {
        onSnap.forEach((doc) => {
          if (doc.id === firebase.auth().currentUser.uid) {
            name = doc.data().username;
            arr = doc.data().gameScores;
            this.setState({ username: name });
            this.setState({
              topScores: arr.sort((a, b) => {
                return (a < b);
              })
            });
            console.log(this.state.topScores)
          }
        })

        return this.setState({ thanosSnap: this.unsubscribe() })
      })
      this.unsubscribe2 = this._refresh().then(() => {
        this.setState({ reload: false })

      })



    };
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
        <Body style={{ flex: .7, paddingBottom: 170 }}>

          <Text style={{ fontFamily: 'Avenir-Heavy', fontSize: 20, color: 'red' }}>
            Profile
          </Text>
          <TouchableOpacity onPress={() => this.changeUsername()}>
            <Avatar size="medium" rounded title="JD" />
          </TouchableOpacity>


          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontFamily: 'Avenir-Heavy' }}>Hello</Text>
            <Text style={{ fontFamily: 'Avenir-Heavy', color: 'red' }}> {this.state.username}</Text>
          </View>
          {this.state.change === true &&
            <View style={{ flexDirection: 'column' }}>
              <View style={{ flexDirection: 'row' }}>
                <TextInput
                  style={{
                    width: 100,
                    height: 40,
                    textAlign: 'center',
                    color: 'rgba(365,0,0,0.7)'

                  }}
                  onChangeText={(text) => this.setState({ newUsername: text })}
                  value={this.state.newUsername}
                  placeholder={this.state.username}
                />
                <Button
                  title='update'
                  style={{ height: 30, }}
                  onPress={() => this.updateUsername()}
                />
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={{
                    width: 100,
                    height: 40,
                    textAlign: 'center',
                    color: 'rgba(365,0,0,0.7)'
                  }}
                />
                <Button
                  title='reset password'
                  style={{ height: 30, }}
                  onPress={() => this.updatePassword()}
                />
              </View>

              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={{
                    width: 100,
                    height: 40,
                    textAlign: 'center',
                    color: 'rgba(365,0,0,0.7)'
                  }}
                />
                <Button
                  title='create challenge'
                  style={{ height: 30, }}
                  onPress={() => this.props.navigation.navigate('Challenge')}
                />
              </View>


              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={{
                    width: 100,
                    height: 40,
                    textAlign: 'center',
                    color: 'rgba(365,0,0,0.7)'
                  }}
                />
                <Button
                  title='delete account'
                  style={{ height: 30, }}
                  onPress={() => this.deleteAccount()}
                />
              </View>
            </View>
          }
        </Body>

        {this.state.topScores.length !== 0 &&
          <FlatList
            style={{ flexDirection: 'row', height: 20 }}
            horizontal
            data={this.state.topScores}
            renderItem={({ item, key, index }) => {
              return (
                <Card
                  key={key}
                  index={index}
                  title={'High Score ' + (index + 1)}
                >
                  <Text style={{ textAlign: 'center', fontSize: 30 }}>{item}</Text>
                </Card>
              );
            }}

            keyExtractor={(item, index) => index.toString()}
          />
        }
        {this.state.topScores.length === 0 &&
          <Text style={{ textAlign: 'center', fontSize: 50 }}>No Scores to Display</Text>
        }

        <TouchableOpacity style={{ alignItems: 'center', paddingTop: 10 }} onPress={() => this.props.navigation.navigate('Leaderboard')} >
          <Text style={{ fontFamily: 'Avenir-Heavy', fontSize: 20, color: 'blue' }}>
            See Leaderboard
          </Text>
        </TouchableOpacity>

        <View style={{ flex: 3 }}>
          <Text style={{ textAlign: 'center', fontSize: 30, fontFamily: 'Avenir-Heavy' }}>My Challenges</Text>
          <FlatList
            data={this.state.myChallenges}
            style={{ flexDirection: 'column', alignContent: 'center' }}
            renderItem={({ item, key, index }) => {
              return (
                <View index={index} key={key} style={{ flexDirection: 'row', justifyContent: 'center' }}>
                  <Text style={{ textAlign: 'center', fontSize: 20, paddingTop: 5 }}>{this.state.myChallenges[index]}</Text>
                  <Button index={index} title={'delete' /*+ this.state.myChallenges[index]*/} size={20} onPress={async () => {
                    // Alert.alert('deleting ' + this.state.myChallenges[index]);
                    // this.unsubscribe3 = firebase.firestore().collection('questions').doc(this.state.myChallenges[index]).collection('questions').delete();
                    this.unsubscribe4 = firebase.firestore().collection('questions').doc(this.state.myChallenges[index]).delete()
                    this.unsubscribe5 = firebase.firestore().collection('user categories').doc(this.state.myChallenges[index]).delete()
                    this.unsubscribe6 = this.state.userRef.collection('my challenges').doc(this.state.myChallenges[index]).delete()

                    Alert.alert('challenge deleted')
                    this._refresh();

                  }} />
                </View>
              )
            }}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>


      </SafeAreaView>

    );
  }

  componentWillUnmount() {
    this.state.thanosSnap;
    this.unsubscribe2;
    // this.unsubscribe3;
    this.unsubscribe4;
    this.unsubscribe5;
    this.unsubscribe6;
  }
}

export default ProfileScreen;
