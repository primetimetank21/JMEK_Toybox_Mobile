import 'react-native';
import React from 'react';
import LeaderboardScreen from '../Screens/Leaderboard';
import renderer from 'react-test-renderer';
import FirebaseConfig from '../FirebaseConfig';
import * as firebase from 'firebase';

describe('Leaderboard', () => {
  beforeAll(() => {
    firebase.initializeApp(FirebaseConfig);
  });
});
