import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import * as firebase from 'firebase';
import FirebaseConfig from './FirebaseConfig';
import LoginScreen from './Screens/Login';
import HomeScreen from './Screens/Home';
import ForgotPasswordScreen from './Screens/ForgotPassword'
import LeaderboardScreen from './Screens/Leaderboard';
import GameTypeScreen from './Screens/GameType';
import GameModeScreen from './Screens/GameMode';


// firebase.initializeApp(FirebaseConfig);
if (!firebase.apps.length) { firebase.initializeApp(FirebaseConfig); }

const MainNavigator = createStackNavigator({
    Login: {screen: LoginScreen}, 
    Home: {screen: HomeScreen},
    Forgot: {screen: ForgotPasswordScreen},
    Leaderboard: {screen: LeaderboardScreen},
    GameType: {screen: GameTypeScreen},
    GameMode: {screen: GameModeScreen}
  
});

const App = createAppContainer(MainNavigator);

export default App;