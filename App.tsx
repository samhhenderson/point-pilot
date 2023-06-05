import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { Provider } from 'react-redux';
import store from './src/redux/store'

import Game from './src/views/Game';
import * as Colors from './src/styles/Colors'

export default function App() {
  return (
    <Provider store={store}>
      <View style={Styles.statusBarContainer}>
        <StatusBar />
      </View>
      <Game/>
    </Provider>
  );
}

const Styles = StyleSheet.create({
  statusBarContainer: {
    width: "100%",
    height: 20,
    backgroundColor: Colors.COLOR3,
  },
});
