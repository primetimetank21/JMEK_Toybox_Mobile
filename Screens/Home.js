import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Alert,
  Button,
  TouchableOpacity,
} from 'react-native';
import {Header, Left, Body, Title, Right} from 'native-base';

import * as firebase from 'firebase';
import 'firebase/firestore';

import {Avatar, ListItem} from 'react-native-elements';

import {Colors} from 'react-native/Libraries/NewAppScreen';
// import { Header } from 'react-navigation-stack';

const list = [
  {
    name: 'Food',
    avatar_url:
      'https://assets3.thrillist.com/v1/image/2797371/size/tmg-article_default_mobile.jpg',
  },
  {
    name: 'Foreign Language',
    avatar_url:
      'data:image/jpeg;base64,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',
  },
  {
    name: 'Holidays',
    avatar_url:
      'https://img.freepik.com/free-vector/thanksgiving-concept-with-flat-design-background_23-2148307232.jpg?size=626&ext=jpg',
  },
  {
    name: 'Music',
    avatar_url:
      'https://www.billboard.com/files/styles/article_main_image/public/media/02-BTS-backstage-billboard-BBMAS-1548.jpg',
  },
  {
    name: 'Soccer',
    avatar_url:
      'https://cdn.shopify.com/s/files/1/0712/4751/products/SMA-01_2000x.jpg?v=1571438902',
  },
  {
    name: 'U.S. Colleges',
    avatar_url:
      'https://yt3.ggpht.com/a/AGF-l798ef0U-LpPD9xUpkHmpJ3mpAaXCbVLvAWuUg=s900-c-k-c0xffffffff-no-rj-mo',
  },
  // {
  //   name: 'The Beatles',
  //   avatar_url:
  //     'https://www.grammy.com/sites/com/files/styles/image_landscape_hero/public/beatles-hero-514890404.jpg?itok=0lUBO7km',
  // },
];
// const list2 = [
//   // {
//   //   name: 'Kingdom Hearts',
//   //   avatar_url:
//   //     'https://as.com/meristation/imagenes/2019/01/27/noticias/1548592407_949428_1548592775_noticia_normal.jpg',
//   // },
//   {
//     name: 'Food',
//     avatar_url:
//       'https://assets3.thrillist.com/v1/image/2797371/size/tmg-article_default_mobile.jpg',
//   },
//   {
//     name: 'Holidays',
//     avatar_url:
//       'https://img.freepik.com/free-vector/thanksgiving-concept-with-flat-design-background_23-2148307232.jpg?size=626&ext=jpg',
//   },
//   {
//     name: 'Music',
//     avatar_url:
//       'https://www.billboard.com/files/styles/article_main_image/public/media/02-BTS-backstage-billboard-BBMAS-1548.jpg',
//   },
//   // {
//   //   name: 'Britney Spears',
//   //   avatar_url:
//   //     'https://peopledotcom.files.wordpress.com/2019/09/rexfeatures_5848777dn_preview.jpg',
//   // },
// ];
class HomeScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={{flex:1, alignContent:'center', justifyContent:'center' }}>

      <View style={{flex: .05, flexDirection: 'row', alignContent:'center', alignItems:'center', justifyContent:'center', paddingBottom:30}}>
        <Header style={{ width:370, alignContent:'center', justifyContent:'center', alignItems:'center' }}>
          <Left style={{  }}>
            <Button style={{  }}
              title="log out"
              onPress={() => {
                firebase
                  .auth()
                  .signOut()
                  .then(this.props.navigation.replace('Login'))
                  .then(() => {
                    Alert.alert('Signed out!');
                  });
              }}
            />
          </Left>

          <Body style={{  }}>
            <Title style={{ }}>Home</Title>
          </Body>

          <Right style={{  }}>
            <Avatar //style={{ flex:1 }}
              rounded
              title="Prof"
              onPress={() => this.props.navigation.navigate('Profile')}
            />
          </Right>
        </Header>
        </View>

        <ScrollView style={{ flex:1 }}>
            <View style={{alignItems: 'center'}}>
              <Text style={{fontSize: 30, fontFamily: 'Avenir-Heavy'}}>
                Categories
              </Text>
            </View>
            <View>

              {
                list.map((l, i) => (
                  <TouchableOpacity key={i} onPress={() => {
                    this.props.navigation.replace('GameType', { titleRef: l.name });

                  }}>
                  <ListItem
                    key={i}
                    leftAvatar={{source: {uri: l.avatar_url}}}
                    title={<Text>{l.name}</Text>}
                    subtitle={l.subtitle}
                    topDivider
                    bottomDivider
                  />
                </TouchableOpacity>
              ))}
            </View>
            {/* <View style={{alignItems: 'center', marginTop: 10}}>
              <Text style={{fontSize: 30, fontFamily: 'Avenir-Heavy'}}>
                Recently Added Categories
              </Text>
            </View>
            <View>
              {list2.map((l, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => {
                    // Alert.alert('Take me to "' + l.name + '" GameType!');
                    this.props.navigation.replace('GameType', {
                      titleRef: l.name,
                    });
                  }}>
                  <ListItem
                    key={i}
                    leftAvatar={{source: {uri: l.avatar_url}}}
                    title={<Text>{l.name}</Text>}
                    subtitle={l.subtitle}
                    bottomDivider
                  />
                </TouchableOpacity>
              ))}
            </View> */}
        </ScrollView>
      </SafeAreaView>

    );
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

