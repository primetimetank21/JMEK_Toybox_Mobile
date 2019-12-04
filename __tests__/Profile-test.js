import 'react-native';
import React from 'react';
import ProfileScreen from '../Screens/Profile';
import renderer from 'react-test-renderer';
import FirebaseConfig from '../FirebaseConfig';
import * as firebase from 'firebase';

describe('Profile', () => {
  beforeAll(() => {
    firebase.initializeApp(FirebaseConfig);
  });
  it('disables the update button if input field is empty', () => {
    const testProps = {
      username: 'bangtan@bangtan.com',
      newUsername: '',
      count: 0,
    };
    const instanceOf = renderer.create(<LoginScreen />).getInstance();
    instanceOf.changeUsername(testProps);
    //instanceOf.updateUsername(testProps);
    const result = instanceOf.isDisabled();
    expect(result).toBeTruthy();
  });
});
