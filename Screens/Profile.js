/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { SafeAreaView, FlatList, ScrollView, View, Text, Button, TouchableOpacity, Alert, TextInput } from 'react-native';
import { Avatar, Card } from 'react-native-elements';
import { Header, Left, Body } from 'native-base';

import * as firebase from 'firebase';
import 'firebase/firestore';

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reload: true,
      change: false,
      username: '',
      topScores: [],
      newUsername: '',
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
    console.log("this.state.newUsername= " + this.state.newUsername)
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

  }

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
                return (a.score > b.score);
              })
            });
            console.log(this.state.topScores)
          }
        })
        return this.setState({ thanosSnap: this.unsubscribe() })
      })
      this.setState({ reload: false })
    };



  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
        <Body style={{ flex: .3, paddingBottom: 130 }}>

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
                    // backgroundColor: 'rgba(1,1,1,.1)',
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
            </View>
          }
        </Body>

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
          keyExtractor={(item, index) => index.key}
        />

        <TouchableOpacity style={{ alignItems: 'center', paddingTop: 10 }} onPress={() => this.props.navigation.navigate('Leaderboard')} >
          <Text style={{ fontFamily: 'Avenir-Heavy', fontSize: 20, color: 'blue' }}>
            See Leaderboard
          </Text>
        </TouchableOpacity>

        <View style={{ flex: 4 }} />
      </SafeAreaView>

    );
  }

  componentWillUnmount() {
    this.state.thanosSnap;
  }
}

export default ProfileScreen;
