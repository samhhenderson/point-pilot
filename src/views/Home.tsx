import { FC, useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";

import { useSelector, useDispatch } from 'react-redux';
import { showNewGameModal } from "../modals/modalsSlice";
import { ThunkDispatch } from "redux-thunk";
import { getPlayers } from "./playerSlice";
import { getGames } from "./gameSlice";

import { State, NavigationPropType, Game } from "../types";
import * as Colors from './../styles/Colors';
import { CommonStyles } from "../styles/CommonStyles";
import GameListItem from "../components/GameListItem";
import Control from "../components/Control";
import NewGameModal from '../modals/newGameModal';
import ConfirmModal from "../modals/ConfirmModal";
import { executeSqlAsync } from "../db/db-service";

type HomeProps = {
  navigation: NavigationPropType,
}

const Home: FC<HomeProps> = ({navigation}) => {
  const dispatch = useDispatch();
  const dispatchThunk:ThunkDispatch<State, null, any> = useDispatch();

  useEffect(() => {
    dispatchThunk(getPlayers())
    dispatchThunk(getGames());
  }, [])

  const game = useSelector((state: State) => state.game);

  //Dev only button
  async function dropTables() {
    try {
      await executeSqlAsync('PRAGMA foreign_keys = OFF;')
      await executeSqlAsync('DROP TABLE IF EXISTS players;')
      await executeSqlAsync('DROP TABLE IF EXISTS games;')
      await executeSqlAsync('DROP TABLE IF EXISTS sessions;')
      await executeSqlAsync('DROP TABLE IF EXISTS playerSessions;')
      await executeSqlAsync('PRAGMA foreign_keys = ON;')
      console.log('TABLES DROPPED')
    } catch (err) {
      console.log(err)
    }
  }

  return (
      <View style={Styles.app}>
        <ScrollView contentContainerStyle={Styles.game}>
          <Text style={[CommonStyles.text, Styles.title]}>Games</Text>
          <View style={Styles.gameListContainer}>
            {game.allIds.map((id) => (
              <GameListItem
                key={id}
                id={id}
              />
            ))}
            <Control
              onPress={() => dispatch(showNewGameModal())}
              text={'+'}
              pressableStyles={[Styles.addButton]}
              textStyles={[{fontSize:40}]}
            />
            <Control
              onPress={dropTables}
              text={'-'}
              pressableStyles={[Styles.addButton, {backgroundColor: 'red'}]}
              textStyles={[{fontSize:40}]}
            />
          </View>
        </ScrollView>
        <NewGameModal
          navigation={navigation}
        />
        <ConfirmModal
          navigation={navigation}
        />
      </View>
  );
};

export default Home;

const Styles = StyleSheet.create({
  app: {
    backgroundColor: Colors.COLOR1,
    flex: 1,
  },
  game: {
    flexGrow: 1,
    backgroundColor: Colors.COLOR1,
  },
  title: {
    fontSize: 50,
    textAlign: 'center',
    marginTop: 30,
  },
  gameListContainer: {
    width: '100%',
    padding: 10,
    gap: 15,
    maxWidth: 500,
  },
  addButton: {
    borderRadius: 35,
    backgroundColor: 'green',
  }
});