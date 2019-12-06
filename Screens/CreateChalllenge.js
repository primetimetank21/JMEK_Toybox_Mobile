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
  TextInput,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import * as firebase from 'firebase';
import 'firebase/firestore';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {array} from 'prop-types';
import {appendToMemberExpression} from '@babel/types';

class CreateChallengeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      answer: '',
      category: '',
      choices: [],
      choice0: '',
      choice1: '',
      choice2: '',
      choice3: '',
      index: 0, //be careful! might break code
      prompt: '',
      pressed: false,
      userQuestions: [
        {
          prompt: '',
          choices: ['', '', '', ''],
          answer: '',
        },
      ],
    };
  }

  addQuestion = () => {
    const condition1 =
      this.state.answer !== '' &&
      Number(this.state.answer) !== NaN &&
      (Number(this.state.answer) >= 0 && Number(this.state.answer) <= 3);
    const condition2 =
      this.state.prompt === '' ||
      this.state.choice0 === '' ||
      this.state.choice1 === '' ||
      this.state.choice2 === '' ||
      this.state.choice3 === '';

    if (this.state.index === 9) {
      Alert.alert('Max number of questions!');
      return false;
    } else if (condition2) {
      Alert.alert(
        'Fill in all required content before adding another question!',
      );
      return false;
    } else if (!condition1) {
      Alert.alert(
        'Correct answer should be a number between 0-3! (0=A, 1=B, 2=C, 3=D)',
      );
      return false;
    } else {
      let q = {
        prompt: this.state.prompt,
        choices: [
          this.state.choice0,
          this.state.choice1,
          this.state.choice2,
          this.state.choice3,
        ],
        answer: this.state.answer,
      };

      this.state.userQuestions.push(q);
      console.log('prompt=' + q.prompt);
      console.log('userQuestions=' + this.state.userQuestions);
      console.log(this.state.index);
      this.setState({prompt: ''}); //push to array
      this.setState({choice0: ''}); //push to array
      this.setState({choice1: ''}); //push to array
      this.setState({choice2: ''}); //push to array
      this.setState({choice3: ''}); //push to array
      this.setState({answer: ''}); //push to array
      this.setState({index: this.state.index + 1});

      this.setState({pressed: true});
      return true;
    }
  };

  submit = () => {
    if (this.state.category === '') {
      Alert.alert('Fill out category!');
      return;
    }
    let submit;
    if (this.state.index === 9) {
      this.state.userQuestions.shift();
      this.state.index--;
      submit = this.addQuestion();
    } else {
      let q = {
        prompt: this.state.prompt,
        choices: [
          this.state.choice0,
          this.state.choice1,
          this.state.choice2,
          this.state.choice3,
        ],
        answer: this.state.answer,
      };
      submit = this.addQuestion();
      this.state.userQuestions.shift();
    }

    if (submit === true) {
      Alert.alert(
        'Submitted ' + this.state.userQuestions.length + ' questions!',
      );
      let tmpInd = 0;
      for (element in this.state.userQuestions) {
        console.log('Submitted');
        console.log(
          'tmpInd= ' +
            tmpInd +
            ': prompt= ' +
            this.state.userQuestions[tmpInd].prompt +
            '; ' +
            this.state.userQuestions[tmpInd].choices +
            '; ' +
            this.state.userQuestions[tmpInd].answer,
        );
        tmpInd++;
      }
    } else {
      Alert.alert('Error creating quiz');
      this.props.navigation.replace('Profile');
    }

    firebase
      .firestore()
      .collection('questions')
      .doc(this.state.category)
      .set({});
    firebase
      .firestore()
      .collection('user categories')
      .doc(this.state.category)
      .set({});

    const ref = firebase
      .firestore()
      .collection('questions')
      .doc(this.state.category)
      .collection('questions');
    const userRef = firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser.uid);

    for (i = 0; i < this.state.userQuestions.length; i++) {
      this.unsubscribe = ref.doc('Q' + (i + 1)).set({
        answer: this.state.userQuestions[i].answer,
        choices: this.state.userQuestions[i].choices,
        prompt: this.state.userQuestions[i].prompt,
      });
    }
    this.unsubscribe2 = userRef
      .collection('my challenges')
      .doc(this.state.category)
      .set({});
    this.props.navigation.navigate('Profile');
  };

  componentDidMount() {
    if (this.state.pressed === true) {
      this.setState({pressed: false});
    }
  }

  componentDidUpdate() {}

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <SafeAreaView style={{alignItems: 'center'}}>
          <Text style={{color: '#FF595E', paddingBottom: 20, fontFamily: 'Avenir-Black', fontSize: 25}}>
            Create Challenge
          </Text>

          <TextInput
            placeholder=" ENTER CATEGORY"
            placeholderTextColor="black"
            style={{color: 'black', fontFamily: 'Avenir-Black', fontSize: 20}}
            onChangeText={text => {
              this.setState({category: text});
            }}
            autoCorrect={false}
            value={this.state.category}
          />
          <View
            style={{flex: 1, alignContent: 'center', justifyContent: 'center'}}>
            <View style={{alignItems: 'center'}} />

            <FlatList
              data={this.state.userQuestions}
              // style={{ flexDirection:'column-reverse', transform: [{ scaleY: -1 }] }}
              renderItem={({item, key = this.state.index, index}) => {
                return (
                  <View
                    key={key}
                    index={index}
                    style={{
                      flex: 1,
                      width: 360,
                      flexDirection: 'column',
                      backgroundColor: '#FF595E',
                      // transform: [{ scaleY: -1 }],
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.answerChoices}>
                        Prompt:{' '}
                      </Text>

                      <TextInput
                        placeholder="prompt"
                        placeholderTextColor="white"
                        style={styles.answerChoices}
                        onChangeText={text => {
                          this.setState({prompt: text});
                        }}
                        autoCorrect={false}
                        // value={this.state.userQuestions[index].prompt}
                        // defaultValue={this.state.userQuestions[index].prompt === undefined ? '' : this.state.userQuestions[index].prompt}
                        value={
                          this.state.userQuestions[index].prompt === ''
                            ? this.state.prompt
                            : this.state.userQuestions[index].prompt
                        }
                      />
                    </View>

                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.answerChoices}>A. </Text>
                      <TextInput
                        placeholder="choice 0 "
                        placeholderTextColor="white"
                        style={styles.answerChoices}
                        onChangeText={text => this.setState({choice0: text})}
                        autoCorrect={false}
                        // value={this.state.userQuestions[index].choice0}
                        defaultValue={this.state.userQuestions[index].choice0}
                      />
                    </View>

                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.answerChoices}>B. </Text>
                      <TextInput
                        placeholder="choice 1 "
                        placeholderTextColor="white"
                        style={styles.answerChoices}
                        onChangeText={text => this.setState({choice1: text})}
                        autoCorrect={false}
                        // value={this.state.userQuestions[index].choice1}
                        defaultValue={this.state.userQuestions[index].choice1}
                      />
                    </View>

                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.answerChoices}>C. </Text>
                      <TextInput
                        placeholder="choice 2 "
                        placeholderTextColor="white"
                        style={styles.answerChoices}
                        onChangeText={text => this.setState({choice2: text})}
                        autoCorrect={false}
                        // value={this.state.userQuestions[index].choice2}
                        defaultValue={this.state.userQuestions[index].choice2}
                      />
                    </View>

                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.answerChoices}>D. </Text>
                      <TextInput
                        placeholder="choice 3 "
                        placeholderTextColor="white"
                        style={styles.answerChoices}
                        onChangeText={text => this.setState({choice3: text})}
                        autoCorrect={false}
                        // value={this.state.userQuestions[index].choice3}
                        defaultValue={this.state.userQuestions[index].choice3}
                      />
                    </View>

                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.answerChoices}>correct answer: </Text>
                      <TextInput
                        placeholder="answer "
                        maxLength={1}
                        placeholderTextColor="white"
                        style={styles.answerChoices}
                        onChangeText={text =>
                          this.setState({answer: Number(text)})
                        }
                        autoCorrect={false}
                        defaultValue={this.state.userQuestions[
                          index
                        ].answer.toString()}
                      />
                    </View>
                    <View style={{height: 2, backgroundColor: 'FF595E'}} />
                  </View>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />
            <Button title="add question" onPress={() => this.addQuestion()} />
          </View>
          <Button title="submit challenge" onPress={() => this.submit()} />
        </SafeAreaView>
      </View>
    );
  }

  componentWillUnmount() {
    //   clearInterval(this._interval);
    this.unsubscribe;
    this.unsubscribe2;
    //   this.state.removeListener;
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
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  answerChoices: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Avenir-Medium',
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

export default CreateChallengeScreen;
