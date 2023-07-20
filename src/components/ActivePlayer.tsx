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
  
  let scoreFontSize = 30;
  let bidFontSize = 30;
  
  if (!player || !playerSession) return null;

  if (Math.abs(playerSession.score) > 9999 ) scoreFontSize = 15;
  else if (Math.abs(playerSession.score) > 999 ) scoreFontSize = 20;
  else if (Math.abs(playerSession.score) > 99) scoreFontSize = 25;

  if (Math.abs(playerSession.bid) > 9999 ) bidFontSize = 20;
  if (Math.abs(playerSession.bid) > 999 ) bidFontSize = 25;
  else if (Math.abs(playerSession.bid) > 99) bidFontSize = 30;
  
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
          textStyles={[{fontSize: bidFontSize}]}
        /> : null}
        <Control
          onPress={() => dispatch(setNumberModal({playerSessionId, isBid: false}))}
          text={playerSession.score.toString()}
          textStyles={[{fontSize: scoreFontSize}]}
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
  nameCont: {
    overflow: 'hidden',
    flexShrink: 1,
  },
})