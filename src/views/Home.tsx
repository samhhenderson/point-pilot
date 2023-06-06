import { FC, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";

import { useSelector, useDispatch } from 'react-redux';

import { State, NavigationPropType, Game } from "../types";
import * as Colors from './../styles/Colors';
import { CommonStyles } from "../styles/CommonStyles";

import { pressStyle } from "../util/helperFunctions";
import GameListItem from "../components/GameListItem";

type HomeProps = {
  navigation: NavigationPropType,
}

const Home: FC<HomeProps> = ({navigation}) => {
  const dispatch = useDispatch();
  const gameList = useSelector((state: State) => state.game.gameList);

  const gameListRender: JSX.Element[] = [];
  gameList.forEach((game:Game, i) => {
    gameListRender.push(
      <GameListItem
        key={i}
        name={game.gameName}
      />)
  })

  return (
      <View style={Styles.app}>
        <ScrollView contentContainerStyle={Styles.game}>
          <Text style={[CommonStyles.text, Styles.title]}>Games</Text>
          <View style={Styles.gameListContainer}>
            {gameListRender}
            <Pressable
              {...pressStyle(CommonStyles.buttons, Styles.addButton)}
              onPress={() => navigation.navigate('Game')}
            >
              <Text style={[CommonStyles.text, {fontSize: 40}]}>+</Text>
            </Pressable>
          </View>
        </ScrollView>
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
    margin: 30,
  },
  addButton: {
    borderRadius: 35,
    backgroundColor: 'green',
  }
});