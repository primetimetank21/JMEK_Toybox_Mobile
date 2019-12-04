import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
  FlatList,
  Alert,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import * as firebase from 'firebase';
import 'firebase/firestore';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {array} from 'prop-types';
import {appendToMemberExpression} from '@babel/types';

class GameModeScreen extends React.Component {
  constructor(props) {
    super(props);
    let array1 = [];
<<<<<<< HEAD
    for (i = 0; i < 10; i++) {
      array1.push(NaN);
=======
    let hiddenArr = [];
    for (i = 0; i < 10; i++) {
      array1.push(NaN)
      hiddenArr.push[true]
>>>>>>> a7bd3916fbf65808a5ae10a2d5270367c03929a2
    }
    this.state = {
      hidden: hiddenArr,
      mode: this.props.navigation.state.params.mode,
      points: 0,
      removeListener: undefined,
      title: this.props.navigation.state.params.title,
      theQuestions: this.props.navigation.state.params.questions,
      theResponses: array1,
      testTimer: 30000,
    };
  }

  _onSubmit = () => {
    var score = 0;
<<<<<<< HEAD
    for (i = 0; i < this.state.theResponses.length; i++) {
      if (this.state.theResponses[i] === this.state.theQuestions[i].answer) {
        score++;
=======
    for (i = 0; i < this.state.theQuestions.length; i++) {
      if (this.state.theQuestions[i].answer !== undefined) {
        if (this.state.theResponses[i] === this.state.theQuestions[i].answer) {
          score++;
        }
>>>>>>> a7bd3916fbf65808a5ae10a2d5270367c03929a2
      }
    }

    this.setState({points: score});
    this.state.removeListener = firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid)
      .update({
        points: firebase.firestore.FieldValue.increment(score),
        gameScores: firebase.firestore.FieldValue.arrayUnion(score),
      });

    if (score === 0 || score > 1) {
      Alert.alert('You earned ' + score + ' points!');
    } else {
      Alert.alert('You earned ' + score + ' point!');
    }
    this.props.navigation.replace('Home');
  };

  _selectChoice = (choice, ind) => {
    let tmpArray = this.state.theResponses;
    tmpArray[ind] = choice;
    this.setState({theResponses: tmpArray});
    // console.log('this.state.theResponses[' + ind + ']= ' + this.state.theResponses[ind])
  };

  componentDidMount() {
    if (this.state.testTimer <= 0) {
      this._onSubmit();
    }
    this._interval = setInterval(() => {
      this.setState({testTimer: this.state.testTimer - 1000});
    }, 1000);
  }

  componentDidUpdate() {
    if (this.state.testTimer <= 0) {
      this._onSubmit();
    }
  }

  render() {
    return (
<<<<<<< HEAD
      <View style={{flex: 1, alignItems: 'center'}}>
        <SafeAreaView style={{alignItems: 'center'}}>
          <Text style={{color: 'blue', paddingBottom: 20}}>
            {this.state.mode}player Quiz about {this.state.title}
          </Text>

          <View
            style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
            <View style={{alignItems: 'center'}}>
              <Text style={{color: 'red', paddingBottom: 10}}>
                Time remaining: {this.state.testTimer / 1000} seconds
              </Text>
=======
      <View style={{ flex: 1, alignItems: 'center' }}>

        <SafeAreaView style={{ alignItems: 'center' }}>
          <Text style={{ color: 'blue', paddingBottom: 20 }}>{this.state.mode}player Quiz about {this.state.title}</Text>

          <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: 'red', paddingBottom: 10 }}>Time remaining: {this.state.testTimer / 1000} seconds</Text>
>>>>>>> a7bd3916fbf65808a5ae10a2d5270367c03929a2

              <FlatList
                data={this.state.theQuestions}
                renderItem={({item, key, index}) => {
                  return (
                    <View
                      key={key}
                      index={index}
                      style={{
                        flex: 1,
                        width: 360,
                        flexDirection: 'column',
                        backgroundColor: 'black',
                      }}>
<<<<<<< HEAD
                      <Text style={{color: 'white', fontSize: 15}}>
                        {item.prompt}
                      </Text>

                      <TouchableOpacity
                        onPress={() => this._selectChoice(0, index)}>
                        <Text style={{color: 'white'}}>
                          A. {item.choices[0]}
                        </Text>
=======

                      <Text style={{ color: 'white', fontSize: 15 }}>{item.prompt}</Text>

                      <TouchableOpacity onPress={() => this._selectChoice(0, index)}>
                        <Text style={{ color: 'white' }}>A. {item.choices[0]}</Text>
>>>>>>> a7bd3916fbf65808a5ae10a2d5270367c03929a2
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this._selectChoice(1, index)}>
                        <Text style={{color: 'white'}}>
                          B. {item.choices[1]}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this._selectChoice(2, index)}>
                        <Text style={{color: 'white'}}>
                          C. {item.choices[2]}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this._selectChoice(3, index)}>
                        <Text style={{color: 'white'}}>
                          D. {item.choices[3]}
                        </Text>
                      </TouchableOpacity>

<<<<<<< HEAD
                      <Text style={{color: 'blue'}}>
                        Response= {item.choices[this.state.theResponses[index]]}
                      </Text>
=======
                      <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => {
                          this.state.hidden[index] = !this.state.hidden[index];
                        }
                        }>
                          <Text style={{ color: 'white' }}>See hint... </Text>
                        </TouchableOpacity>
                        {this.state.hidden[index] &&
                          <View>
                            <Text style={{ color: 'white', opacity: .3 }}> = {item.choices[item.answer]}</Text>
                          </View>
                        }
                      </View>

                      <Text style={{ color: 'blue' }}>Response= {item.choices[this.state.theResponses[index]]}</Text>
>>>>>>> a7bd3916fbf65808a5ae10a2d5270367c03929a2

                      <View style={{height: 2, backgroundColor: 'blue'}} />
                    </View>
                  );
                }}
                keyExtractor={(item, index) => item.prompt}
              />
            </View>
<<<<<<< HEAD
            <Button title="submit" onPress={this._onSubmit} />
=======
            <Button title='submit' onPress={this._onSubmit} />
>>>>>>> a7bd3916fbf65808a5ae10a2d5270367c03929a2
          </View>
        </SafeAreaView>
      </View>
    );
  }

  componentWillUnmount() {
    clearInterval(this._interval);
    this.state.removeListener;
  }
<<<<<<< HEAD
}
=======
>>>>>>> a7bd3916fbf65808a5ae10a2d5270367c03929a2

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

export default GameModeScreen;
