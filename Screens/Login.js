/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {Icon} from 'react-native-vector-icons/Ionicons'
import {Button, ThemeProvider} from 'react-native-elements';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
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
      password: '',
      count: 0
    }

  }

  SignUp = (email, password) => {
    try {
      if (this.state.username === '' || this.state.password === '') {
        Alert.alert("Please fill in all the appropriate fields.");
      }
      firebase.auth().createUserWithEmailAndPassword(email, password).then(user => {
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({
          username: this.state.username,
          password: this.state.password,
          points: 0
        })
        console.log(user);
      });
    } catch (error) {
      Alert.alert(error.toString(error));
      console.log(error.toString(error));
    }
  };



  componentDidMount() {

    firebase.auth().onAuthStateChanged(() => {
      if (firebase.auth().currentUser !== null) {
        if (this.state.count === 0) {
          Alert.alert("Current user= " + firebase.auth().currentUser.email);
          const oldCount = this.state.count + 1;
          this.setState({ count: oldCount });
        }
        this.props.navigation.replace('Home');
      }
    })

  }
  isDisabled() {
    return (this.state.username === '' || this.state.password === '');
  }

  render() {

    return (
      <View style={styles.container}>
        <SafeAreaView style={{ alignItems: 'center' }}>
          <Text style={{ marginRight: 150, marginBottom: 10, color: 'black', fontFamily: "Avenir-Heavy",
          fontSize: 50}}>Hello.</Text>
          <View>
            <TextInput
              placeholder='email'
              onChangeText={(text) => this.setState({ username: text })}
              autoCorrect={false}
              value={this.state.username}
              style={styles.login}
            />
          </View>
          <View style={{ height: 10 }} />

          <View>
            <TextInput
              placeholder='password'
              onChangeText={(text) => this.setState({ password: text })}
              autoCorrect={false}
              value={this.state.password}
              secureTextEntry
              style={styles.login}
            />
          </View>
          <View style={{ height: 10 }} />
          <View style={{ marginLeft: 175,flexDirection: 'row', alignItems: 'flex-end'}}>
            <Text
            style={{color: '#FF595E'}}
            onPress={() => this.props.navigation.navigate('Forgot')}>Forgot password?</Text>
          </View>
          <View style={{ height: 10 }} />
          <Button  color = "#ff5c5c" disabled = {this.isDisabled()} title='Login' onPress={() => {

            try {
                firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password).then(() => {
                  this.props.navigation.replace('Home')
                }, (error) => {
                  Alert.alert(error.message);
                }).catch(function (error) {
                  console.log(error.message)
                });


            } catch (error) {
              Alert.alert(error.toString(error));
              console.log(error.toString(error));
            }



          }} />
          <View style={{ height: 10 }} />
          <Button disabled = {this.isDisabled()} title='Register' onPress={() => {
              this.SignUp(this.state.username, this.state.password) &&
                firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
                  firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password);
                  Alert.alert("You've been added to Firebase!");
                  setTimeout(() => {
                    this.props.navigation.replace('Home');
                  }, 2000)
                });

          }} />
        </SafeAreaView>
      </View>
    );
  }
componentWillUnmount() {
  this.state.username = '';
  this.state.password = '';
  this.state.count = 0;
};

};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  signUpContainer: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginVertical: 16,
    flexDirection: 'row'
  },
  sectionContainer: {
    marginTop: 30,
    paddingHorizontal: 24,
  },
button: {
  width: 300,
  backgroundColor: "#FF595E",
  borderRadius: 10,
  marginVertical: 10,
  paddingVertical: 12
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
  login: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000000',
    width: 300,
    fontSize:16,
    paddingHorizontal: 16,
    height: 50,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: 250,
  }
});

export default LoginScreen;
