import { FC, useState, useEffect} from "react";
import { StyleSheet, Text, View, Pressable, LayoutChangeEvent } from "react-native";

import { useSelector, useDispatch } from 'react-redux';
import { showNumberModal, hideNumberModal } from "../redux/modalsSlice";
import { setNumberModalPlayer } from "../redux/modalsSlice";

import { State } from "../types";
import * as Colors from '../styles/Colors'
import { CommonStyles } from "../styles/CommonStyles";

import Control from "./Control";

type PlayerProps = {
  name: string,
  score: number,
  bid: number,
}

const ActivePlayer: FC<PlayerProps> = ({ name, score, bid }) => {

  const { useBid } = useSelector((state: State) => state.game.activeGame)

  const dispatch = useDispatch();

  function openNumberModal(isBid: boolean) {
    dispatch(setNumberModalPlayer({playerName: name, isBid}));
    dispatch(showNumberModal());
  }

  return (
    <View style={Styles.container} key={name}>
      <Text style={[CommonStyles.text, {fontSize: 50}]}>{name}</Text>
      <View style={Styles.pointsContainer}>
        {useBid ?       
        <Control
          onPress={() => openNumberModal(true)}
          text={bid.toString()}
          pressableStyles={[Styles.bidButton]}
          textStyles={[Styles.bidText]}
        /> : null}
        <Control
          onPress={() => openNumberModal(false)}
          text={score.toString()}
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