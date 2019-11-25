import 'react-native';
import React from 'react';
import LoginScreen from '../Screens/Login';
import renderer from 'react-test-renderer';
import FirebaseConfig from '../FirebaseConfig';
import * as firebase from 'firebase';

describe('Login', () => {
  beforeAll(() => {
    firebase.initializeApp(FirebaseConfig);
  });
  it('renders email correctly', () => {
    const props = {
      username: 'bangtan@bangtan.com',
      password: 'borahae',
      count: 0,
    };
    const instanceOf = renderer.create(<LoginScreen />).getInstance();
    instanceOf.handleEmailText(props.username);
    expect(instanceOf.state.username).toEqual('bangtan@bangtan.com');
  });
  it('renders the password correctly', () => {
    const props = {
      username: 'bangtan@bangtan.com',
      password: 'borahae',
      count: 0,
    };
    const instanceOf = renderer.create(<LoginScreen />).getInstance();
    instanceOf.handlePasswordText(props.password);
    expect(instanceOf.state.password).toEqual('borahae');
  });
  it('disables the sign in button if the password is not touched', () => {
    const testProps = {
      username: 'bangtan@bangtan.com',
      password: '',
      count: 0,
    };
    const instanceOf = renderer.create(<LoginScreen />).getInstance();
    instanceOf.handleEmailText(testProps.username);
    instanceOf.handlePasswordText(testProps.password);
    const result = instanceOf.isDisabled();
    expect(result).toBeTruthy();
  });
  it('disables the sign in button if the username has not been touched', () => {
    const testProps = {
      username: '',
      password: 'borahae',
      count: 0,
    };
    const instanceOf = renderer.create(<LoginScreen />).getInstance();
    instanceOf.handleEmailText(testProps.username);
    instanceOf.handlePasswordText(testProps.password);
    const result = instanceOf.isDisabled();
    expect(result).toBeTruthy();
  });
});
