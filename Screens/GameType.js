import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
  RefreshControl
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

import * as firebase from 'firebase';
import 'firebase/firestore';
import { TouchableOpacity } from 'react-native-gesture-handler';


class GameTypeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.navigation.state.params.titleRef,
      refreshing: false,
      theQuestions: [],
    }
  }

  async componentDidMount() {
  }


  _onRefresh = async () => {
    this.setState({refreshing: true});

    this.unsubscribe = firebase.firestore().collection('questions').doc('Soccer').collection('questions').onSnapshot((snapShot) => {
      let questionArray = [];
      snapShot.forEach((doc) => {
        questionArray.push({
          answer: doc.data().answer,
          choices: doc.data().choices,
          prompt: doc.data().prompt
        });
      });

      console.log('questionArray= ' + questionArray);
      // console.log('questionArray[1].prompt= ' + questionArray[1].prompt);
      // console.log('questionArray[1].choices= ' + questionArray[1].choices);
      // console.log('questionArray[1].answer= ' + questionArray[1].answer);


      this.setState({ theQuestions: questionArray })

      this.state.mounted = true && this.unsubscribe();


    })

    this.setState({refreshing: false});
  
  }

  render() {
  return (
    <View style={{ flex:1, alignItems: 'center' }}>
      <SafeAreaView style={{ alignItems:'center' }}>
        <Text style={{ color:'red' }}>{this.state.title}</Text>
        {/* <Button title='To Home' onPress={() =>  this.props.navigation.navigate('Home')} /> */}
        <Button title='Single Player GameMode' onPress={() =>  this.props.navigation.navigate('GameMode')} />
        <Button title='Multi Player GameMode' onPress={() =>  this.props.navigation.navigate('GameMode')} />
        
        <View style={{ flex: 1, alignContent:'center', justifyContent:'center' }}>
          <TouchableOpacity onPress={this._onRefresh}>
         <Text>Hello</Text>
          </TouchableOpacity>
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

export default GameTypeScreen;