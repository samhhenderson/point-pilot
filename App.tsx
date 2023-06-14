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
import store from './src/store';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

// Import other modules
import { State } from './src/types';
import Game from './src/views/Game';
import Home from './src/views/Home';
import { executeSqlAsync } from './src/db/db-service';

const Stack = createNativeStackNavigator();

export default function App() {


  useEffect(() => {

    // executeSqlAsync('DROP TABLE IF EXISTS players;')
    // .then(response => console.log(response))
    // .catch(error => console.log('DELETE TABLE ' + error))

    const createPlayerTable = 
    `CREATE TABLE IF NOT EXISTS players (
      name TEXT PRIMARY KEY,
      icon TEXT DEFAULT 'none',
      active INTEGER DEFAULT 0,
      score INTEGER DEFAULT 0,
      bid INTEGER DEFAULT 0,
      team INTEGER DEFAULT 0,
      place INTEGER DEFAULT 0
    );`
    executeSqlAsync(createPlayerTable)
      .catch(error => console.log('CREATE PLAYER TABLE ' + error))

    const createGameTable =
    `CREATE TABLE IF NOT EXISTS games (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE,
      lowScoreWins INTEGER CHECK(lowScoreWins IN (0,1)),
      useBid INTEGER CHECK(useBid IN (0,1)),
      teams INTEGER CHECK(teams IN (0,1))
    );`
    executeSqlAsync(createGameTable)
      .catch(error => console.log('CREATE GAME TABLE ' + error))
  }, [])

  return (
    <Provider store={store}>
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
            name='Game'
            component={Game}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const Styles = StyleSheet.create({

})
