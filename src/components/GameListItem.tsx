import { FC, useRef } from "react";
import { StyleSheet, Text, View, Pressable, LayoutChangeEvent } from "react-native";

import { useSelector, useDispatch } from 'react-redux';
import { showNumberModal, hideNumberModal } from "../modals/modalsSlice";
import { setNumberModalPlayer } from "../modals/modalsSlice";

import * as Colors from '../styles/Colors'
import { CommonStyles } from "../styles/CommonStyles";
import { pressStyle } from "../util/helperFunctions";

type GameListItemProps = {
  name: string,
}

const GameListItem: FC<GameListItemProps> = ({ name }) => {
  const dispatch = useDispatch();

  return (
    <View style={Styles.container} key={name}>
      <Text style={[CommonStyles.text, {fontSize: 30}]}>{name}</Text>
      <Pressable
          {...pressStyle(CommonStyles.buttons)}
          onPress={() => console.log('delete this fucker!')}
      >
        <Text style={[CommonStyles.text, {fontSize: 40}]}>X</Text>
      </Pressable>
    </View>
  );
};

export default GameListItem;
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
})