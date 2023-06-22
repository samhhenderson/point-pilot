
// Import React and React Native modules
import { FC, useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

// Import Redux modules
import { useSelector, useDispatch } from 'react-redux';
import { showNewGameModal } from "../redux/modalsSlice";
import { ThunkDispatch } from "redux-thunk";
import { getPlayers } from "../redux/playerSlice";
import { getGames } from "../redux/gameSlice";

// Import other modules
import { State, NavigationPropType, } from "../types";
import * as Colors from './../styles/Colors';
import { CommonStyles } from "../styles/CommonStyles";
import GameListItem from "../components/GameListItem";
import Control from "../components/Control";
import NewGameModal from '../modals/NewGameModal';
import ConfirmModal from "../modals/ConfirmModal";
import { executeSqlAsync } from "../db/db-service";
import Home from "./Home";
import SessionView from "./SessionView";

type GameProps = {
  navigation: NavigationPropType,
}

type RootStackParamList = {
  Home: undefined,
  SessionView: {sessionId: number},
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const Game: FC<GameProps> = ({navigation}) => {

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