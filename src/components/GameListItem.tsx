import { FC, useRef } from "react";
import { StyleSheet, Text, View, Pressable, LayoutChangeEvent } from "react-native";

import { useSelector, useDispatch } from 'react-redux';
import {  showNewGameModal, setConfirmModal } from "../modals/modalsSlice";
import { setActiveGame } from "../views/gameSlice";

import * as Colors from '../styles/Colors';
import * as Sizes from '../styles/Sizes';
import { CommonStyles } from "../styles/CommonStyles";
import Control from "./Control";

type GameListItemProps = {
  name: string,
}

const GameListItem: FC<GameListItemProps> = ({ name }) => {
  const dispatch = useDispatch();

  function handlePressGameItem() {
    dispatch(setActiveGame(name));
    dispatch(showNewGameModal());
  }

  function handleDeleteGameItem() {
    dispatch(setConfirmModal({
      message: `Remove ${name} from game list?`,
      confirmFunc: 'deleteGame',
      confirmArgs: [name],
    }))
  }

  return (
    <View style={Styles.container} key={name}>
      <Control
        onPress={handlePressGameItem}
        text={name}
        pressableStyles={[Styles.gameNameButton]}
        textStyles={[{fontSize:30}]}
      />
      <Control
        onPress={handleDeleteGameItem}
        text={'X'}
        pressableStyles={[Styles.deleteButton]}
        textStyles={[{fontSize:20}]}
      />
    </View>
  );
}

export const Styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  gameNameButton: {
    flexGrow: 1,
    backgroundColor: Colors.COLOR2,
    borderRadius: 10,
    height: Sizes.smallButtons,
  },
  deleteButton: {
    backgroundColor: Colors.COLOR5,
    height: Sizes.smallButtons - 10,
    width: Sizes.smallButtons - 10,
    borderRadius: 10,
  }
})

export default GameListItem;