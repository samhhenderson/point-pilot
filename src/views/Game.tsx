import { FC, useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";

import { useSelector, useDispatch } from 'react-redux';
import { showNewGameModal } from "../redux/modalsSlice";
import { ThunkDispatch } from "redux-thunk";
import { getPlayers } from "../redux/playerSlice";
import { getGames } from "../redux/gameSlice";

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

const Game: FC<GameProps> = ({navigation}) => {

  const { session } = useSelector((state: State) => state);
  const [ incompleteSession, setIncompleteSession ] = useState(() => {
    const lastSession = session.byId[session.allIds[-1]];
    if (!lastSession.complete) {
      return lastSession;
    }
    return null;
  });

  return (
    <View style={Styles.app}>
      {incompleteSession ? (
        <SessionView sessionId={incompleteSession.id} />
      ) : (
        <Home navigation={navigation} />
      )}
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