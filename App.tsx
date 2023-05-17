import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Game from './src/views/Game';

export default function App() {
  return (
    <>
      <View style={Styles.statusBarContainer}>
        <StatusBar barStyle="light-content" />
      </View>
      <Game/>
    </>
  );
}

const Styles = StyleSheet.create({
  statusBarContainer: {
    width: "100%",
    height: 20,
    backgroundColor: "white",
  },
});
