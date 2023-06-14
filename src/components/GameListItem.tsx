import { FC, useRef } from "react";
import { StyleSheet, Text, View, Pressable, LayoutChangeEvent } from "react-native";

import { useSelector, useDispatch } from 'react-redux';
import {  showNewGameModal, setConfirmModal } from "../modals/modalsSlice";
import { setActiveGame } from "../views/gameSlice";

import * as Colors from '../styles/Colors';
import * as Sizes from '../styles/Sizes';
import { CommonStyles } from "../styles/CommonStyles";
import Control from "./Control";
import { State } from "../types";

type GameListItemProps = {
  id: number,
}

const GameListItem: FC<GameListItemProps> = ({ id }) => {
  const dispatch = useDispatch();

  const game = useSelector((state: State) => state.game);

  function handlePressGameItem() {
    dispatch(setActiveGame(id));
    dispatch(showNewGameModal());
  }

  function handleDeleteGameItem() {
    dispatch(setConfirmModal({
      message: `Remove ${game.byId[id].name} from game list?`,
      confirmFunc: 'deleteGame',
      confirmArgs: [id],
    }))
  }

  return (
    <View style={Styles.container}>
      <Control
        onPress={handlePressGameItem}
        text={game.byId[id].name}
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