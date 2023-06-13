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

    // executeSqlAsync('DROP TABLE IF EXISTS Players;')
    // .then(response => console.log(response))
    // .catch(error => console.log('CREATE TABLE ' + error))

    const createPlayerTable = 
    `CREATE TABLE IF NOT EXISTS Players (
      name TEXT PRIMARY KEY,
      icon TEXT DEFAULT 'none',
      active INTEGER DEFAULT 0,
      score INTEGER DEFAULT 0,
      bid INTEGER DEFAULT 0,
      team INTEGER DEFAULT 0,
      place INTEGER DEFAULT 0
    );`
    executeSqlAsync(createPlayerTable)
      .catch(error => console.log('CREATE TABLE ' + error))


    // //executeSqlAsync('DELETE FROM Players;')

    // const testQuery = 
    // `INSERT INTO Players (playerName, icon)
    // VALUES (?, ?)`
    // executeSqlAsync(testQuery, ['Sam', 'Ugly'])
    //   .then(response => console.log(response))
    //   .catch(error => console.log('INSERT ' + error))
    
    // executeSqlAsync('SELECT * FROM Players;')
    //   .then((response) => console.log(response.rows._array))
    //   .catch(error => console.log(error))
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
