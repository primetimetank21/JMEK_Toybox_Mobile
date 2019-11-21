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
  Alert
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import * as firebase from 'firebase';
import 'firebase/firestore';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import { array } from 'prop-types';
import { appendToMemberExpression } from '@babel/types';

class GameModeScreen extends React.Component {
  constructor(props) {
    super(props);
    let array1 = [];
    for(i = 0; i < 10; i++) {
      array1.push(NaN)
    }
    this.state = {
      mode: this.props.navigation.state.params.mode,
      points: 0,
      title: this.props.navigation.state.params.title,
      theQuestions: this.props.navigation.state.params.questions,
      theResponses: array1,
      testTimer: 30000
    }
  }

  _onSubmit = () => {
    var score = 0;
    for (i = 0; i < this.state.theResponses.length; i++) {
      // console.log("this.state.theResponses["+i+"]= " + this.state.theResponses[i]);
      if(this.state.theResponses[i] === this.state.theQuestions[i].answer) {
        // console.log("Yes");
        score++;
      }
      // else {
      //   console.log("No");
      // }
    }

    this.setState({ points: score });
    console.log('this.state.points= ' + score);

    // var admin = require('firebase-admin');

    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).update({
      points: firebase.firestore.FieldValue.increment(score)
    })
    
    if (score === 0 || score > 1) {
      Alert.alert("You earned " + score + " points!");
    }
    else {
      Alert.alert("You earned " + score + " point!");
    }
    this.props.navigation.replace("Home");
  }

  _selectChoice = (choice, ind) => {
    let tmpArray = this.state.theResponses;
    tmpArray[ind] = choice;
    this.setState({ theResponses: tmpArray })
    // console.log('this.state.theResponses[' + ind + ']= ' + this.state.theResponses[ind])
  }

  componentDidMount() {
    // this.setState({ testTimer: 60000 })
    if(this.state.testTimer <= 0) {
      this._onSubmit();
    }
    this._interval = setInterval(() => {
      this.setState({ testTimer: this.state.testTimer - 1000 })
    }, 1000)
  }

  componentDidUpdate() {
    if(this.state.testTimer <= 0) {
      this._onSubmit();
    }
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  render() {
  return (
    <View style={{ flex:1, alignItems: 'center' }}>

      <SafeAreaView style={{ alignItems:'center' }}>
      <Text style={{ color:'blue', paddingBottom:20 }}>{this.state.mode}player Quiz about {this.state.title}</Text>

         <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
            <View style={{ alignItems:'center' }}>
            <Text style={{ color:'red', paddingBottom:10 }}>Time remaining: {this.state.testTimer / 1000} seconds</Text>

              <FlatList
                data={this.state.theQuestions}
                renderItem={({ item, key, index }) => {
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
                      <Text style={{ color: 'white', fontSize:15 }}>{item.prompt}</Text>
                      <TouchableOpacity onPress={() => this._selectChoice(0, index)}>
                        <Text style={{ color: 'white' }}>A. {item.choices[0]}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => this._selectChoice(1, index)}>
                        <Text style={{ color: 'white' }}>B. {item.choices[1]}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => this._selectChoice(2, index)}>
                        <Text style={{ color: 'white' }}>C. {item.choices[2]}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => this._selectChoice(3, index)}>
                        <Text style={{ color: 'white' }}>D. {item.choices[3]}</Text>
                      </TouchableOpacity>

                      {/* <Text style={{ color: 'white' }}/> */}
                      {/* <Text style={{ color: 'white' }}>Correct Answer: {item.choices[item.answer]}</Text> */}
                      {/* <Text style={{ color: 'blue' }}>key= {index}</Text> */}
                      <Text style={{ color: 'blue' }}>Response= {item.choices[this.state.theResponses[index]]}</Text>

                      <View style={{ height: 2, backgroundColor: 'blue' }} />
                    </View>
                  );
                }}
                keyExtractor={(item, index) => item.prompt}
              />
            </View>
            <Button title='submit' onPress={this._onSubmit}/>
          </View>
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

export default GameModeScreen;