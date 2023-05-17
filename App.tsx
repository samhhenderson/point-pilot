import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Game from './src/views/Game';
import { Provider } from 'react-redux';
import store from './src/redux/store'

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
    backgroundColor: "white",
  },
});
