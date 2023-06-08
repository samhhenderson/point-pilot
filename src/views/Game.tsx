import { FC, useState } from "react";
import { StyleSheet, Text, View, ScrollView} from "react-native";

import { useSelector, useDispatch } from 'react-redux';

import { Player, State, NavigationPropType } from "../types";
import * as Colors from './../styles/Colors';
import { CommonStyles } from "../styles/CommonStyles";
import ActivePlayer, { Styles as APStyles } from "../components/ActivePlayer";
import NumberModal from "../modals/NumberModal";
import Control from "../components/Control";

type GameProps = {
  navigation: NavigationPropType,
}

const Game: FC<GameProps> = ({ navigation }) => {
  const dispatch = useDispatch();

  const playerList = useSelector((state: State) => state.player.playerList);
  const { gameName, useBid } = useSelector((state: State) => state.game.activeGame);

  let activePlayerList:  JSX.Element[] = [];
  
  playerList.forEach((player:Player, i) => {
    if (player.active) {
    activePlayerList.push(
      <ActivePlayer 
        key={i}
        bid={player.bid}
        name={player.name} 
        score={player.score}
      />)
    }
  })
  
  function endGame() {
    navigation.navigate('Home')
  }

  return (
      <View style={Styles.app}>
        <ScrollView contentContainerStyle={Styles.game}>
          <Text style={[CommonStyles.text, Styles.title]}>{gameName}</Text>
          <View style={Styles.playerContainer}>
            <View style={[APStyles.container, Styles.headings]} >
              <Text style={[CommonStyles.text, {fontSize: 20}]}>NAME</Text>
              <View style={APStyles.pointsContainer}>
                <Text style={[CommonStyles.text, Styles.bidAndScoreText]}>BID</Text>
                <Text style={[CommonStyles.text, Styles.bidAndScoreText]}>SCORE</Text>
              </View>
            </View>
            {activePlayerList}
          </View>
          <View style={Styles.endGameContainer}>
            <Control
              onPress={endGame}
              text={'END GAME'}
              pressableStyles={[Styles.endGameButton]}
              textStyles={[{fontSize:30}]}
              />
          </View>
        </ScrollView>
        <NumberModal/>
      </View>
  );
};

export default Game;

const Styles = StyleSheet.create({
  app: {
    backgroundColor: Colors.COLOR1,
    flex: 1,
  },
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
  playerContainer: {
    width: '100%',
    padding: 10,
    gap: 10,
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
    width: 200,
    backgroundColor: Colors.COLOR5,
    borderRadius: 2,
    borderColor: 'white',
    borderWidth: 1, 
  }
});