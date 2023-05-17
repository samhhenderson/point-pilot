import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { add } from "../redux/playerSlice";

import * as Colors from './../styles/Colors';
import Player from "../common/Players";


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

const Game: React.FC = () => {
  const players = useSelector((state:any) => state.player.players);
  console.log(players)

  return (
    <View style={Styles.background}>
      <Text style={Styles.text}>Nerts</Text>
      <View>
      <Player name={players[0].name}/>
      </View>
      <Pressable style={Styles.buttons} onPress={() => useDispatch()}>
        <Text style={Styles.text}>ADD PLAYER</Text>
      </Pressable>
    </View>
  );
};

export default Game;