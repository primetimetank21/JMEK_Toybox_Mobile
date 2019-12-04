import 'react-native';
import React from 'react';
import HomeScreen from '../Screens/Home';
import renderer from 'react-test-renderer';
import FirebaseConfig from '../FirebaseConfig';
import * as firebase from 'firebase';

describe('Home', () => {
  beforeAll(() => {
    firebase.initializeApp(FirebaseConfig);
  });

// nothing to test
