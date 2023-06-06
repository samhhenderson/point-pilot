import { FC, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";

import { useSelector, useDispatch } from 'react-redux';
import { addPlayer } from "../components/playerDisplaySlice";

import { Player, State } from "../types";
import * as Colors from './../styles/Colors';
import { CommonStyles } from "../styles/CommonStyles";
import PlayerDisplay, { Styles as PDStyles } from "../components/PlayerDisplay";
import NumberModal from "../modals/NumberModal";
import { pressStyle } from "../util/helperFunctions";

const Game: FC = () => {
  const dispatch = useDispatch();

  const players = useSelector((state: State) => state.playerDisplay.players);
  const { gameName, useBid } = useSelector((state: State) => state.game.gameDisplay);
  
  const [playerPositions, setPlayerPositions] = useState();

  let playerList:  JSX.Element[] = [];
  
  players.forEach((player:Player, i) => {
    playerList.push(
      <PlayerDisplay 
        key={i}
        bid={player.bid}
        name={player.name} 
        score={player.score}
        setPlayerPositions={setPlayerPositions}
      />)
  })
  
  function endGame() {

  }

  return (
      <ScrollView contentContainerStyle={Styles.game}>
        <Text style={[CommonStyles.text, Styles.title]}>{gameName}</Text>
        <View style={Styles.playSpace}>
          <View style={Styles.playerContainer}>
            <View style={[PDStyles.container, Styles.headings]} >
              <Text style={[CommonStyles.text, {fontSize: 20}]}>NAME</Text>
              <View style={PDStyles.pointsContainer}>
                <Text style={[CommonStyles.text, Styles.bidAndScoreText]}>BID</Text>
                <Text style={[CommonStyles.text, Styles.bidAndScoreText]}>SCORE</Text>
              </View>
            </View>
            {playerList}
          </View>
        </View>
        <NumberModal/>
        <View style={Styles.endGameContainer}>
          <Pressable
            {...pressStyle(CommonStyles.buttons, Styles.endGameButton)}
            onPress={endGame}
          >
            <Text style={[CommonStyles.text, {fontSize: 40}]}>END GAME</Text>
          </Pressable>
        </View>
      </ScrollView>
  );
};

export default Game;

const Styles = StyleSheet.create({
  game: {
    flexGrow: 1,
    backgroundColor: Colors.COLOR1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 50,
    textAlign: 'center',
    marginTop: 30,
  },
  playSpace: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerContainer: {
    width: '100%',
  },
  headings: {
    borderColor: 'transparent',
    marginBottom: -15,
    marginTop: -15,
  },
  bidAndScoreText: {
    fontSize: 20,
    width: 70,
  },
  endGameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
  },
  endGameButton: {
    width: 230,
    backgroundColor: Colors.COLOR5,
  }
});