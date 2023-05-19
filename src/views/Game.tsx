import { FC } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

import { useSelector, useDispatch } from 'react-redux';
import { addPlayer } from "../redux/activePlayerSlice";

import { Player, State } from "../types";
import * as Colors from './../styles/Colors';
import PlayerDisplay from "../common/PlayerDisplay";
import NumberModal from "../modals/NumberModal";

const Game: FC = () => {
  const players = useSelector((state: State) => state.activePlayer.players);
  const numberModalVis = useSelector((state: State) => state.view.numberModalVis)
  console.log(numberModalVis)


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
      <Pressable 
        style={Styles.buttons} 
        onPress={() => dispatch(addPlayer({name: 'Sally', score: 1, bid: 0}))}>
        <Text style={Styles.text}>END GAME</Text>
      </Pressable>
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
  buttons: {
    backgroundColor: Colors.COLOR5,
    borderRadius: 10,
    padding: 10,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  text: {
    color: 'white'
  }
});