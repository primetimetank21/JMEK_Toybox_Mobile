import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
  FlatList
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import { array } from 'prop-types';

class GameModeScreen extends React.Component {
  constructor(props) {
    super(props);
    let array1 = [];
    // array.length = this.props.navigation.state.params.questions.length
    for(i = 0; i < 10; i++) {
      array1.push(NaN)
      // console.log('hey')
    }
    this.state = {
      mode: this.props.navigation.state.params.mode,
      title: this.props.navigation.state.params.title,
      theQuestions: this.props.navigation.state.params.questions,
      theRespones: array1
    }
  }


  // _onRefresh = () => {

  //     console.log('questionArray= ' + this.state.theQuestions);
  //     // console.log('questionArray[1].prompt= ' + this.state.theQuestions[1].prompt);
  //     // console.log('questionArray[1].choices= ' + this.state.theQuestions[1].choices);
  //     // console.log('questionArray[1].answer= ' + this.state.theQuestions[1].answer);
  // }

  _selectChoice = (choice, ind) => {
    let tmpArray = this.state.theRespones;
    tmpArray[ind] = choice;
    this.setState({ theResponses: tmpArray })
    console.log('this.state.theRespones[' + ind + ']= ' + this.state.theRespones[ind])
  }

  render() {

    

  return (
    <View style={{ flex:1, alignItems: 'center' }}>
      <SafeAreaView style={{ alignItems:'center' }}>
        <Text style={{ color:'red' }}>{this.state.mode}player Quiz about {this.state.title}</Text>
         <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}>
            <View>
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
                        backgroundColor: 'red',
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

                      <Text style={{ color: 'white' }}/>
                      <Text style={{ color: 'white' }}>Correct Answer: {item.choices[item.answer]}</Text>
                      {/* <Text style={{ color: 'blue' }}>key= {index}</Text> */}
                      <Text style={{ color: 'blue' }}>Response= {item.choices[this.state.theRespones[index]]}</Text>

                      <View style={{ height: 2, backgroundColor: 'blue' }} />
                    </View>
                  );
                }}
                keyExtractor={(item, index) => item.prompt}

              />
            </View>


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