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
      newUsername: '',
    }
  };

  changeUsername = () => {
    // Alert.alert("Pressed")
    this.setState({ change: !this.state.change })
    // console.log("this.state.change= " + this.state.change)
  };

  updateUsername = () => {
    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).update({
      username: this.state.newUsername,
    })
    console.log("this.state.newUsername= " + this.state.newUsername)
    this.setState({ newUsername: '' })
    this.setState({ change: !this.state.change })

  };

  componentDidMount() {
    if (this.state.reload === true) {
      let name = '';
      firebase.firestore().collection('users').onSnapshot((onSnap) => {
        onSnap.forEach((doc) => {
          if (doc.id === firebase.auth().currentUser.uid) {
            name = doc.data().username
            this.setState({ username: name })
          }
        })

      })

      this.setState({ reload: false })

    }
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
        <Body style={{ flex: .3, paddingBottom: 90 }}>

          <Text style={{ fontFamily: 'Avenir-Heavy', fontSize: 20, color: 'red' }}>
            Profile
          </Text>
          <TouchableOpacity onPress={() => this.changeUsername()}>
            <Avatar size="medium" rounded title="JD" />
          </TouchableOpacity>


          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontFamily: 'Avenir-Heavy' }}>Hello</Text>
            <Text style={{ fontFamily: 'Avenir-Heavy' }}> {this.state.username}</Text>
          </View>
          {this.state.change === true &&
            <View style={{ flexDirection: 'row' }}>
              <TextInput
                style={{
                  backgroundColor: 'rgba(1,1,1,.1)',
                  width: 100,
                  height: 30,
                  textAlign: 'center',
                  color: 'rgba(365,0,0,.7)'

                }}
                onChangeText={(text) => this.setState({ newUsername: text })}
                value={this.state.newUsername}
                placeholder={this.state.username}
              />
              <Button
                title='submit'
                style={{ height: 30, }} 
                onPress={() => this.updateUsername()}
                />
            </View>

          }
        </Body>

        <ScrollView
          style={{ flex: .2 }}
          horizontal={true}
          decelerationRate={0}
          snapToInterval={200} //your element width
          snapToAlignment={'center'}>
          <Card style={{ height: 30 }} title="Card" />
          <Card title="Card" />
          <Card title="Card" />
          <Card title="Card" />
          <Card title="Card" />
        </ScrollView>
        <TouchableOpacity style={{ alignItems: 'center', paddingTop: 10 }} onPress={() => this.props.navigation.navigate('Leaderboard')} >
          <Text style={{ fontFamily: 'Avenir-Heavy', fontSize: 20, color: 'blue' }}>
            See Leaderboard
          </Text>
        </TouchableOpacity>

        <View style={{ flex: 4 }} />
      </SafeAreaView>

    );
  }
}

export default ProfileScreen;
