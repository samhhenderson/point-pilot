import { FC } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

import { useSelector, useDispatch } from 'react-redux';
import { addPlayer } from "../components/playerDisplaySlice";

import { Player, State } from "../types";
import * as Colors from './../styles/Colors';
import PlayerDisplay from "../components/PlayerDisplay";
import NumberModal from "../modals/NumberModal";

const Game: FC = () => {
  const players = useSelector((state: State) => state.playerDisplay.players);
  const numberModalVis = useSelector((state: State) => state.modals.number.vis)

  let playerList:  JSX.Element[] = [];
  
  players.forEach((player:Player, i) => {
    playerList.push(
      <PlayerDisplay 
        key={i}
        bid={player.bid}
        name={player.name} 
        score={player.score}
      />)
  })
  
  const dispatch = useDispatch();
  
  return (
    <View style={Styles.background}>
      <Text style={Styles.text}>Nerts</Text>
      <View>
      {playerList}
      </View>
      <NumberModal/>
    </View>
  );
};

export default Game;

const Styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.COLOR1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white'
  }
});