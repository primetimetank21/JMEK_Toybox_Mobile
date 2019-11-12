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

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

import * as firebase from 'firebase';
import 'firebase/firestore';

class ForgotPasswordScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: ''
    };
  };

  onResetPasswordPress = () => {
    firebase.auth().sendPasswordResetEmail(this.state.username)
        .then(() => {
            Alert.alert("Password reset email has been sent.");
        }, (error) => {
            Alert.alert(error.message);
        }).then(this.props.navigation.navigate('Login'));

}

  render() {

    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <SafeAreaView style={{ alignItems: 'center' }}>
          <Text style={{ color: 'red' }}>Forgot Password Screen</Text>
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

          <Button title='Submit' onPress={this.onResetPasswordPress} />

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

export default ForgotPasswordScreen;
