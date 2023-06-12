import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import store from './src/store'

import Game from './src/views/Game';
import Home from './src/views/Home';
import * as Colors from './src/styles/Colors'
import db from './src/db/db-service';

const Stack = createNativeStackNavigator();

export default function App() {

  useEffect(() => {

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
