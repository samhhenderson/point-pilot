import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { Provider } from 'react-redux';
import store from './src/store'

import Game from './src/views/Game';
import * as Colors from './src/styles/Colors'

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style='light'/>
      <Game/>
    </Provider>
  );
}

