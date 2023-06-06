import { FC, useRef } from "react";
import { StyleSheet, Text, View, Pressable, LayoutChangeEvent } from "react-native";

import { useSelector, useDispatch } from 'react-redux';
import { showNumberModal, hideNumberModal } from "../modals/modalsSlice";
import { setNumberModalPlayer } from "../modals/modalsSlice";

import * as Colors from '../styles/Colors';
import * as Sizes from '../styles/Sizes';
import { CommonStyles } from "../styles/CommonStyles";
import { pressStyle } from "../util/helperFunctions";

type GameListItemProps = {
  name: string,
}

const GameListItem: FC<GameListItemProps> = ({ name }) => {
  const dispatch = useDispatch();

  return (
    <View style={Styles.container} key={name}>
      <Pressable
          {...pressStyle(CommonStyles.buttons, Styles.gameNameButton)}
          onPress={() => console.log('play this fucker!')}
      >
        <Text style={[CommonStyles.text, {fontSize: 30}]}>{name}</Text>
      </Pressable>
      <Pressable
          {...pressStyle(CommonStyles.buttons, Styles.deleteButton)}
          onPress={() => console.log('delete this fucker!')}
      >
        <Text style={[CommonStyles.text, {fontSize: 40}]}>X</Text>
      </Pressable>
    </View>
  );
}

export const Styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    borderRadius: 10,
  },
  gameNameButton: {
    flexGrow: 1,
    backgroundColor: Colors.COLOR2,
    borderRadius: 2,
    borderColor: 'white',
    borderWidth: 1,
    height: Sizes.smallButtons,
  },
  deleteButton: {
    backgroundColor: Colors.COLOR5,
    height: Sizes.smallButtons,
    borderRadius: 2,
    borderColor: 'white',
    borderWidth: 1,
  }
})

export default GameListItem;