import { FC, useState, useEffect} from "react";
import { StyleSheet, Text, View, Pressable, LayoutChangeEvent } from "react-native";

import { useSelector, useDispatch } from 'react-redux';
import { setNumberModal, hideNumberModal } from "../redux/modalsSlice";


import { State } from "../types";
import * as Colors from '../styles/Colors'
import { CommonStyles } from "../styles/CommonStyles";

import Control from "./Control";

type PlayerProps = {
  playerSessionId: number,
  useBid: boolean,
}

const ActivePlayer: FC<PlayerProps> = ({ playerSessionId, useBid }) => {

  const dispatch = useDispatch();

  const playerSession = useSelector((state: State) => {
    return state.playerSession.byId[playerSessionId];
  })
  const player = useSelector((state: State) => {
    return state.player.byId[playerSession.playerId]
  });


  return (
    <View style={Styles.container}>
      <Text style={[CommonStyles.text, {fontSize: 50}]}>{player.name}</Text>
      <View style={Styles.pointsContainer}>
        {useBid ?       
        <Control
          onPress={() => dispatch(setNumberModal({playerSessionId, isBid: true}))}
          text={playerSession.bid.toString()}
          pressableStyles={[Styles.bidButton]}
          textStyles={[Styles.bidText]}
        /> : null}
        <Control
          onPress={() => dispatch(setNumberModal({playerSessionId, isBid: false}))}
          text={playerSession.score.toString()}
          textStyles={[{fontSize: 40}]}
        />
      </View>
    </View>
  );
};

export default ActivePlayer;
export const Styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    borderColor: Colors.COLOR2,
    borderWidth: 5,
    justifyContent: 'space-between',
    padding: 10,
    gap: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  pointsContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  bidButton: {
    backgroundColor: Colors.COLOR3,
  },
  bidText: {
    fontSize: 40,
    color: 'black'
  }
})