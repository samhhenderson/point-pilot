import { FC, useState, useEffect} from "react";
import { StyleSheet, Text, View, Pressable, LayoutChangeEvent } from "react-native";

import { useSelector, useDispatch } from 'react-redux';
import { setNumberModal, hideNumberModal } from "../redux/modalsSlice";


import { State } from "../types";
import * as Colors from '../styles/Colors';
import * as Sizes from '../styles/Sizes';
import { CStyles } from "../styles/CommonStyles";

import Control from "./Control";

type PlayerProps = {
  playerSessionId: number,
  useBid: boolean,
}

const ActivePlayer: FC<PlayerProps> = ({ playerSessionId, useBid }) => {

  const dispatch = useDispatch();

  const playerSession = useSelector((state: State) => {
    if (state.playerSession.byId[playerSessionId]) {
      return state.playerSession.byId[playerSessionId];
    } else return null;
  })
  
  const player = useSelector((state: State) => {
    if (playerSession && playerSession.playerId) {
      return state.player.byId[playerSession.playerId]
    } else return null;
  });

  if (!player || !playerSession) return null;

  return (
    <View style={Styles.container}>
      <View style={Styles.nameCont}>
        <Text 
          style={[CStyles.text, {fontSize: 35}]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {player.name}
        </Text>
      </View>
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
    borderColor: Colors.COLOR6,
    borderWidth: 5,
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: Sizes.MED_BORDER_RADIUS,
    alignItems: 'center',
  },
  pointsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  bidButton: {
    backgroundColor: Colors.COLOR2,
  },
  bidText: {
    fontSize: 40,

  },
  nameCont: {
    overflow: 'hidden',
    flexShrink: 1,
  },
})