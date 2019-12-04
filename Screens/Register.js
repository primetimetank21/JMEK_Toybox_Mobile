/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {Button} from 'react-native-elements';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Alert,
  TextInput,
} from 'react-native';

import * as firebase from 'firebase';
import 'firebase/firestore';

import {Colors} from 'react-native/Libraries/NewAppScreen';

// import { widthPercentageToDP as wp, heightPercentageToDP as hp, } from 'react-native-responsive-screen';

class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      count: 0,
    };
  }
  handleEmailText = text => {
    this.setState({
      username: text,
    });
  };
  handlePasswordText = text => {
    this.setState({
      password: text,
    });
  };
  handleConfirmPasswordText = text => {
    this.setState({confirmPassword: text});
  };

  SignUp = (email, password) => {
    try {
      if (this.state.username === '' || this.state.password === '') {
        Alert.alert('Please fill in all the appropriate fields.');
      }
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
          firebase
            .firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .set({
              username: this.state.username,
              email: this.state.username,
              points: 0,
              gameScores: []
            });
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
          Alert.alert('Current user= ' + firebase.auth().currentUser.email);
          const oldCount = this.state.count + 1;
          this.setState({count: oldCount});
        }
        this.props.navigation.replace('Home');
      }
    });
  }

  isDisabled = () => {
    var a = true;
<<<<<<< HEAD
    if (
      this.state.username !== '' &&
      this.state.password !== '' &&
      this.state.confirmPassword !== '' &&
      this.state.password === this.state.confirmPassword &&
      (this.state.password.length >= 6 &&
        this.state.confirmPassword.length >= 6)
    ) {
=======
    if((this.state.username !== '' && this.state.password !== '' &&
        this.state.confirmPassword !== '') &&
       (this.state.password === this.state.confirmPassword) &&
       (this.state.password.length >= 6 &&
        this.state.confirmPassword.length >= 6)
      ) {
>>>>>>> eba3a391ae41275c9e9ee853ef4598368da0b10f
      a = false;
    }
    return a;
  };

  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 200,
          }}>
          <Text
            style={{
              marginRight: 80,
              marginBottom: 10,
              color: 'black',
              fontFamily: 'Avenir-Heavy',
              fontSize: 50,
            }}>
            Welcome.
          </Text>
          <View>
            <TextInput
              placeholder="email"
              // eslint-disable-next-line prettier/prettier
              onChangeText={(text) => {
                this.setState({ username: text })
              }}
              autoCorrect={false}
              value={this.state.username}
              style={styles.login}
            />
          </View>
          <View style={{height: 10}} />

          <View>
            <TextInput
              placeholder="password"
              onChangeText={(text) =>  {
                this.setState({password: text})
              }}
              autoCorrect={false}
              value={this.state.password}
              secureTextEntry
              style={styles.login}
            />
          </View>
          <View style={{height: 10}} />
          <View>
            <TextInput
              placeholder="confirm password"
              onChangeText={(text) => this.setState({confirmPassword: text})}
              autoCorrect={false}
              value={this.state.confirmPassword}
              secureTextEntry
              style={styles.login}
            />
          </View>
          <View style={{height: 10}} />
          <Button
            disabled={this.isDisabled()}
            title="Register"
            onPress={() => {
              this.SignUp(this.state.username, this.state.password) &&
                firebase
                  .auth()
                  .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                  .then(() => {
                    firebase
                      .auth()
                      .signInWithEmailAndPassword(
                        this.state.username,
                        this.state.password,
                      );
                    Alert.alert("You've been added to Firebase!");
                    setTimeout(() => {
                      this.props.navigation.replace('Home');
                    }, 2000);
                  });
            }}
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text>Already have an account?</Text>
            <Text
              style={{color: '#FF595E'}}
              onPress={() => this.props.navigation.navigate('Login')}>
              {' '}
              Sign In!
            </Text>
          </View>
        </SafeAreaView>
      </View>
    );
  }
  componentWillUnmount() {
    this.state.username = '';
    this.state.password = '';
    this.state.count = 0;
  }
}

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
    flexDirection: 'row',
  },
  sectionContainer: {
    marginTop: 30,
    paddingHorizontal: 24,
  },
  button: {
    width: 300,
    backgroundColor: '#FF595E',
    borderRadius: 10,
    marginVertical: 10,
    paddingVertical: 12,
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
    fontSize: 16,
    paddingHorizontal: 16,
    height: 50,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: 250,
  },
});

export default RegisterScreen;
