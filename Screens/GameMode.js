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
    let hiddenArr = [];
    for (i = 0; i < 10; i++) {
      array1.push(NaN);
      hiddenArr.push[true];
    }
    this.state = {
      hidden: hiddenArr,
      mode: this.props.navigation.state.params.mode,
      points: 0,
      removeListener: undefined,
      title: this.props.navigation.state.params.title,
      theQuestions: this.props.navigation.state.params.questions,
      theResponses: array1,
      testTimer: 60000,
    };
  }

  _onSubmit = () => {
    var score = 0;
    for (i = 0; i < this.state.theQuestions.length; i++) {
      if (this.state.theQuestions[i].answer !== undefined) {
        if (this.state.theResponses[i] === this.state.theQuestions[i].answer) {
          score++;
        }
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
                        backgroundColor: '#FF595E',
                      }}>
                      <Text style={{color: 'white', fontSize: 25}}>
                        {item.prompt}
                      </Text>

                      <TouchableOpacity
                        onPress={() => this._selectChoice(0, index)}>
                        <Text style={styles.answerChoices}>
                          A. {item.choices[0]}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this._selectChoice(1, index)}>
                        <Text style={styles.answerChoices}>
                          B. {item.choices[1]}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this._selectChoice(2, index)}>
                        <Text style={styles.answerChoices}>
                          C. {item.choices[2]}
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => this._selectChoice(3, index)}>
                        <Text style={styles.answerChoices}>
                          D. {item.choices[3]}
                        </Text>
                      </TouchableOpacity>

                      <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity
                          onPress={() => {
                            this.state.hidden[index] = !this.state.hidden[
                              index
                            ];
                          }}>
                          <Text style={styles.answerChoices}>See hint... </Text>
                        </TouchableOpacity>
                        {this.state.hidden[index] && (
                          <View>
                            <Text style={{color: 'white', opacity: 0.3}}>
                              {' '}
                              = {item.choices[item.answer]}
                            </Text>
                          </View>
                        )}
                      </View>

                      <Text style={{color: 'white'}}>
                        Response= {item.choices[this.state.theResponses[index]]}
                      </Text>

                      <View style={{height: 2, backgroundColor: 'white'}} />
                    </View>
                  );
                }}
                keyExtractor={(item, index) => item.prompt}
              />
            </View>
            <Button title="submit" onPress={this._onSubmit} />
          </View>
        </SafeAreaView>
      </View>
    );
  }

  componentWillUnmount() {
    clearInterval(this._interval);
    this.state.removeListener;
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
  answerChoices: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Avenir-Medium',
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
