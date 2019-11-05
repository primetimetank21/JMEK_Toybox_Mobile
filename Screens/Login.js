/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  Alert,
  TextInput,
  StatusBar,
} from 'react-native';

import * as firebase from 'firebase';
import 'firebase/firestore';



import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

// import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';


class LoginScreen extends React.Component {

  constructor(props) {
    
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  SignUp = (email, password) => {
    try {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
          console.log(user);
        });
    } catch (error) {
      console.log(error.toString(error));
    }
  };

   

  componentDidMount() {
    firebase.auth().onAuthStateChanged(() => {
      if(firebase.auth().currentUser !== null) {
        Alert.alert("Current user= " + firebase.auth().currentUser.email)
        this.props.navigation.replace('Home');
      }
      // else {
      //   this.props.navigation.replace('Login')

      // }
    })

  }

  render() {

    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <SafeAreaView style={{ alignItems: 'center' }}>
          <Text style={{ color: 'red' }}>Login Screen</Text>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
            <Button title='To Forgot Password' onPress={() => this.props.navigation.navigate('Forgot')} />
          </View>
          <View style={{ height: 20, width: 300, }}>
            <TextInput
              placeholder='email'
              onChangeText={(text) => this.setState({ username: text })}
              autoCorrect={false}
              value={this.state.username}
              style={{ backgroundColor: 'pink', width: '100%', flexDirection: 'row', flex: 1 }}
            />
          </View>
          <View style={{ height: 10 }} />

          <View style={{ height: 20, width: 300, }}>
            <TextInput
              placeholder='password'

              onChangeText={(text) => this.setState({ password: text })}
              autoCorrect={false}
              value={this.state.password}
              secureTextEntry
              style={{ backgroundColor: 'pink', width: '100%', flexDirection: 'row', flex: 1 }}
            />
          </View>
          <View style={{ height: 10 }} />

          <Button title='Login' onPress={() => {
            // Alert.alert("username= " + this.state.username + "\npassword= " + this.state.password);
            if (firebase.auth().currentUser !== null) {
              firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
              this.props.navigation.replace('Home');
              Alert.alert("You're already signed in!")
            }
            else {
              firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password).then(() => {
                this.props.navigation.replace('Home')
              }, (error) => {
                Alert.alert(error.message);
              }).catch(function (error) {
                console.log(error.message)
              });
            }






          }} />

          <Button title='Sign-up' onPress={() => {
            this.SignUp(this.state.username, this.state.password),
              firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
                // firebase.auth().createUserWithEmailAndPassword(this.state.username, this.state.password).then(() => {
                firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({
                  username: this.state.username,
                  password: this.state.password
                }).then(() => {
                  this.props.navigation.replace('Home');
                  Alert.alert("You've been added to firebase!")
                })
              })
            // })


          }} />



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

export default LoginScreen;
