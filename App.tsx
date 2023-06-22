// Purpose: Main entry point for the app. Contains the navigation stack and redux provider.
// Import React and React Native modules
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { SQLResultSet } from 'expo-sqlite';

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
import SessionView from './src/views/SessionView';
import Home from './src/views/Home';
import { executeSqlAsync } from './src/db/db-service';

type RootStackParamList = {
  Home: undefined,
  SessionView: {sessionId: number},
}

const Stack = createNativeStackNavigator<RootStackParamList>();

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
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen
            name='Home'
            component={Home}
          />
          <Stack.Screen
            name='SessionView'
            component={SessionView}
          />
        </Stack.Navigator>
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
