import 'react-native';
import React from 'react';
import RegisterScreen from '../Screens/Register';
import renderer from 'react-test-renderer';
import FirebaseConfig from '../FirebaseConfig';
import * as firebase from 'firebase';

describe('Register', () => {
  beforeAll(() => {
    firebase.initializeApp(FirebaseConfig);
  });
  it('disables the register button if the password is not touched', () => {
    const testProps = {
      username: 'bangtan@bangtan.com',
      password: '',
      confirmPassword: 'borahae',
      count: 0,
    };
    const instanceOf = renderer.create(<RegisterScreen />).getInstance();
    instanceOf.SignUp(testProps);
    const result = instanceOf.isDisabled();
    expect(result).toBeTruthy();
  });
  it('disables the register button if the username has not been touched', () => {
    const testProps = {
      username: '',
      password: 'borahae',
      confirmPassword: 'borahae',
      count: 0,
    };
    const instanceOf = renderer.create(<RegisterScreen />).getInstance();
    instanceOf.SignUp(testProps);
    const result = instanceOf.isDisabled();
    expect(result).toBeTruthy();
  });
  it('disables the register button if the confirmPassword has not been touched', () => {
  const testProps = {
    username: 'bangtan@bangtan.com',
    password: 'borahae',
    confirmPassword: '',
    count: 0,
  };
  const instanceOf = renderer.create(<RegisterScreen />).getInstance();
  instanceOf.SignUp(testProps);
  const result = instanceOf.isDisabled();
  expect(result).toBeTruthy();
  });
  it('disables the register button if the confirmPassword is not equal to password', ()=>{
    const testProps = {
      username: 'bangtan@bangtan.com',
      password: 'borahae',
      confirmPassword: 'borahaee',
      count: 0,
    };
    const instanceOf = renderer.create(<RegisterScreen />).getInstance();
    instanceOf.SignUp(testProps);
    const result = instanceOf.isDisabled();
    expect(result).toBeTruthy();
  });
  it('disables the register button if the password is less then  6 characters', ()=>{
    const testProps = {
      username: 'bangtan@bangtan.com',
      password: 'bor',
      confirmPassword: 'bor',
      count: 0,
    };
    const instanceOf = renderer.create(<RegisterScreen />).getInstance();
    instanceOf.SignUp(testProps);
    const result = instanceOf.isDisabled();
    expect(result).toBeTruthy();
  });
});
