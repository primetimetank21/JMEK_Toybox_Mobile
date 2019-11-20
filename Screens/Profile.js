/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { FlatList, ScrollView, View, Text, Button, TouchableOpacity } from 'react-native';
import { Avatar, Card } from 'react-native-elements';
import { Header, Left } from 'native-base';

class ProfileScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            // justifyContent:'center',
            // alignContent:'center',
            backgroundColor: 'white',
            height: 150,
          }}>
          {/* <Left> */}
          {/* <Button title='back' onPress={() => this.props.navigation.replace('Home')} /> */}
          {/* </Left> */}
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Leaderboard')} >
            <Text style={{ fontFamily: 'Avenir-Heavy', fontSize: 20, color:'blue' }}>
              Profile
          </Text>
          </TouchableOpacity>

          <Avatar size="medium" rounded title="MD" />

          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontFamily: 'Avenir-Heavy' }}>Hello</Text>
            <Text style={{ fontFamily: 'Avenir-Heavy' }}>example</Text>
          </View>
        </Header>

        <View>
          <ScrollView
            horizontal={true}
            decelerationRate={0}
            snapToInterval={200} //your element width
            snapToAlignment={'center'}>
            <Card title="Card" />
            <Card title="Card" />
            <Card title="Card" />
            <Card title="Card" />
            <Card title="Card" />
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default ProfileScreen;
