import { FC } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

import { useSelector, useDispatch } from 'react-redux';
import { showNumberModal, hideNumberModal } from "../modals/modalsSlice";

import * as Colors from '../styles/Colors'
import Control from "./Controls";

type PlayerProps = {
  name: string;
  score: number;
  bid: number;
}

const PlayerDisplay: FC<PlayerProps> = ({ name, score, bid }) => {

  return (
    <View style={Styles.container} key={name}>
      <Text style={Styles.text}>{name}</Text>
      <Control 
        text={bid.toString()} 
        action={showNumberModal} 
        payload={{player: name, bid: false}}
      />
      <Control text={score.toString()} action={hideNumberModal}/>
    </View>
  );
};

export default PlayerDisplay;
const Styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    borderColor: Colors.COLOR2,
    borderWidth: 5,
    backgroundColor: Colors.COLOR1,
    justifyContent: 'space-between',
    padding: 10,
    gap: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 30,
  }
});