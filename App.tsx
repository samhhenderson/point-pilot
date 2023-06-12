import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { SQLResultSet } from 'expo-sqlite';

import store from './src/store'

import Game from './src/views/Game';
import Home from './src/views/Home';
import * as Colors from './src/styles/Colors'
import { db, executeSqlAsync } from './src/db/db-service';

const Stack = createNativeStackNavigator();

export default function App() {

  useEffect(() => {
    const createPlayerTable = 
    `CREATE TABLE IF NOT EXISTS Players (
      playerName TEXT PRIMARY KEY,
      icon TEXT
    );`
    executeSqlAsync(createPlayerTable)
      .then(response => console.log(response))
      .catch(error => console.log('CREATE TABLE ' + error))

    //executeSqlAsync('DELETE FROM Players;')

    const testQuery = 
    `INSERT INTO Players (playerName, icon)
    VALUES (?, ?)`
    executeSqlAsync(testQuery, ['Sam', 'Ugly'])
      .then(response => console.log(response))
      .catch(error => console.log('INSERT ' + error))
    
    executeSqlAsync('SELECT * FROM Players;')
      .then((response) => console.log(response.rows._array))
      .catch(error => console.log(error))
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
