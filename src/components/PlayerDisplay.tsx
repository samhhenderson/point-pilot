import { FC, useRef } from "react";
import { StyleSheet, Text, View, Pressable, LayoutChangeEvent } from "react-native";

import { useSelector, useDispatch } from 'react-redux';
import { showNumberModal, hideNumberModal } from "../modals/modalsSlice";
import { setNumberModalPlayer } from "../modals/modalsSlice";

import * as Colors from '../styles/Colors'
import { CommonStyles } from "../styles/CommonStyles";
import { pressStyle } from "../util/helperFunctions";

type PlayerProps = {
  name: string,
  score: number,
  bid: number,
}

const PlayerDisplay: FC<PlayerProps> = ({ name, score, bid }) => {
  const nameRef = useRef(null);
  const bidRef = useRef<typeof Pressable>();
  const scoreRef = useRef<typeof Pressable>();
  
  const dispatch = useDispatch();

  function openNumberModal(isBid: boolean) {
    dispatch(setNumberModalPlayer({playerName: name, isBid}));
    dispatch(showNumberModal());
  }

  return (
    <View style={Styles.container} key={name}>
      <Text style={[CommonStyles.text, {fontSize: 50}]}>{name}</Text>
      <View style={Styles.pointsContainer}>
        <Pressable
            {...pressStyle(CommonStyles.buttons)}
            onPress={() => openNumberModal(true)}
        >
          <Text style={[CommonStyles.text, {fontSize: 40}]}>{bid}</Text>
        </Pressable>
        <Pressable
            {...pressStyle(CommonStyles.buttons)}
            onPress={() => openNumberModal(false)}
        >
          <Text style={[CommonStyles.text, {fontSize: 40}]}>{score}</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default PlayerDisplay;
export const Styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    borderColor: Colors.COLOR2,
    borderWidth: 5,
    justifyContent: 'space-between',
    padding: 10,
    margin: 10,
    gap: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  pointsContainer: {
    flexDirection: 'row',
    gap: 15,
  }
})