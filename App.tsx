import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { Provider } from 'react-redux';
import store from './src/store'

import Game from './src/views/Game';
import * as Colors from './src/styles/Colors'

export default function App() {
  return (
    <Provider store={store}>
      <View style={Styles.app}>
        <StatusBar style='light' backgroundColor='#C2185B' translucent={false}/>
        <Game/>
      </View>
    </Provider>
  );
}

const Styles = StyleSheet.create({
  app: {
    backgroundColor: Colors.COLOR1,
    flex: 1,
  },
})
