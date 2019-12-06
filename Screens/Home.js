import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  YellowBox,
  View,
} from 'react-native';
import {Header, Left, Body, Title, Right} from 'native-base';
import * as firebase from 'firebase';
import 'firebase/firestore';

import {Avatar, ListItem} from 'react-native-elements';
import {CardList} from './Components/CardList';
import {Colors} from 'react-native/Libraries/NewAppScreen';
console.disableYellowBox = true;
const list = [
  {
    title: 'Cars',
    picture: require('../images/cars.jpeg'),
  },
  {
    title: 'Food',
    picture: require('../images/food.jpeg'),
  },
  {
    title: 'Foreign Language ',
    picture: require('../images/foreign_language.jpeg'),
  },
  {
    title: 'Holidays',
    picture: require('../images/holidays.jpeg'),
  },
  {
    title: 'Music',
    picture: require('../images/music.jpeg'),
  },
  {
    title: 'Soccer',
    picture: require('../images/soccer.jpeg'),
  },
  {
    title: 'Movies',
    picture: require('../images/college.jpeg'),
  },
  {
    title: 'Video Games',
    picture: require('../images/video_games.jpeg'),
  },
];

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    // this.unsubscribe = firebase.firestore().collection('questions').get().then( (snapShot) => {
    //   snapShot.forEach(doc => {
    //     console.log(doc.id)
    //     tmpArr.push(doc.id);
    //   });
    // })
    this.state = {
      userGeneratedCategories: [],
      refresh: true,
    };
  }

  _refresh = async () => {
    this.setState({userGeneratedCategories: []});
    this.unsubscribe = await firebase
      .firestore()
      .collection('user categories')
      .get()
      .then(snapShot => {
        snapShot.forEach(doc => {
          console.log(doc.id);
          this.state.userGeneratedCategories.push({
            title: doc.id,
            picture: '',
            createdBy: doc.data().username,
          });
        });
        console.log('this.state.categories= ');
        for (elm in this.state.userGeneratedCategories) {
          console.log(this.state.userGeneratedCategories[elm]);
        }
      })
      .then(() => {
        this.setState({refresh: true});
      });
  };
  componentDidMount() {
    if (this.state.refresh === true) {
      this.setState({refresh: false});
    }

    if (this.state.userGeneratedCategories.length === 0) {
      this._refresh();
    }
  }
  render() {
    return (
      <SafeAreaView
        style={{ flex: 1, alignContent: 'center', justifyContent: 'center'}}>
        <View
          style={{
            flex: 0.075,
            flexDirection: 'row',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: 10,
          }}>
          <Left/>
            <TouchableOpacity onPress={() => this._refresh()}>
              <Title style={{fontSize: 37.9, fontFamily: 'AvenirNextCondensed-Bold'}}>Toybox</Title>
            </TouchableOpacity>

          <Right style={{paddingBottom:20, marginTop: 30, marginRight: 20}}>
            <Avatar 
            overlayContainerStyle={{backgroundColor: 'red'}}
              rounded
              size='medium'
              title="Prof"
              onPress={() => this.props.navigation.navigate('Profile')}
            />
          </Right>
        </View>

        <ScrollView style={{flex: 1}}>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 30, fontFamily: 'Avenir-Heavy'}}>
              Categories
            </Text>
          </View>
          <View>
            <CardList navigation={this.props.navigation} cards={list} />
            <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 30, justifyContent: 'center', fontFamily: 'Avenir-Heavy'}}>
              User Challenges
            </Text>
            </View>
            <CardList
              navigation={this.props.navigation}
              cards={this.state.userGeneratedCategories}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  componentWillUnmount() {
    this.unsubscribe;
  }
}

export default HomeScreen;

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
  font: {
    fontFamily: 'Avenir-Medium',
    fontSize: 20,
  },
  header: {
    width: 370,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
