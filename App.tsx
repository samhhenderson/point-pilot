// Purpose: Main entry point for the app. Contains the navigation stack and redux provider.
// Import React and React Native modules
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


// Import Redux modules
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, } from 'react-redux';
import { getPlayers } from './src/redux/playerSlice';
import { getGames } from './src/redux/gameSlice';
import { getSessions } from './src/redux/sessionSlice';
import { getPlayerSessions } from './src/redux/playerSessionSlice';

// Import other modules
import { State } from './src/types';
import History from './src/views/History';
import Game from './src/views/Game';
import { executeSqlAsync } from './src/db/db-service';

type RootStackParamList = {
  Game: undefined,
  History: undefined,
}

const Tab = createBottomTabNavigator<RootStackParamList>();

function App() {
  const dispatchThunk:ThunkDispatch<State, null, any> = useDispatch();

  useEffect(() => {
    const createPlayerTable = 
    `CREATE TABLE IF NOT EXISTS players (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      icon TEXT DEFAULT 'none'
    );`
    executeSqlAsync(createPlayerTable)
    .catch(error => console.log('CREATE PLAYER TABLE ' + error))

    const createGameTable =
    `CREATE TABLE IF NOT EXISTS games (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      lowScoreWins INTEGER CHECK(lowScoreWins IN (0,1)),
      useBid INTEGER CHECK(useBid IN (0,1)),
      teams INTEGER CHECK(teams IN (0,1))
    );`
    executeSqlAsync(createGameTable)
    .catch(error => console.log('CREATE GAME TABLE ' + error))

    const createSessionTable =
    `CREATE TABLE IF NOT EXISTS sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      gameId INTEGER,
      date TEXT,
      complete INTEGER CHECK(complete IN (0,1)),
      FOREIGN KEY(gameId) REFERENCES games(id)
    );`
    executeSqlAsync(createSessionTable)
    .catch(error => console.log('CREATE SESSION TABLE ' + error))

    const createPlayerSessionTable =
    `CREATE TABLE IF NOT EXISTS playerSessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      playerId INTEGER,
      sessionId INTEGER,
      score INTEGER DEFAULT 0,
      bid INTEGER DEFAULT 0,
      team INTEGER DEFAULT 1,
      place INTEGER DEFAULT 0,
      FOREIGN KEY(playerId) REFERENCES players(id),
      FOREIGN KEY(sessionId) REFERENCES sessions(id)
    );`
    executeSqlAsync(createPlayerSessionTable)
    .catch(error => console.log('CREATE SESSION TABLE ' + error))

    dispatchThunk(getPlayers());
    dispatchThunk(getGames());
    dispatchThunk(getSessions());
    dispatchThunk(getPlayerSessions());
  }, [])


  return (
    <>
      <StatusBar style='light'/>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{headerShown: false}}>
          <Tab.Screen 
            name='Game' 
            component={Game} 
          />
          <Tab.Screen 
            name='History' 
            component={History} 
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

export default function AppWithProvider() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

const Styles = StyleSheet.create({

})
