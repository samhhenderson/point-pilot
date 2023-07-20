
// Import React and React Native modules
import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import Redux modules

// Import other modules
import * as Colors from './../styles/Colors';
import Home from "./Home";
import SessionView from "./SessionView";

type RootStackParamList = {
  Home: undefined,
  SessionView: {sessionId: number},
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const Game: FC = () => {

  return (
    <View style={Styles.app}>
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
    </View>
  );
};

export default Game;

const Styles = StyleSheet.create({
  app: {
    backgroundColor: Colors.COLOR1,
    flex: 1,
  },

});