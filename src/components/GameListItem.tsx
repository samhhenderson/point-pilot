import { FC } from "react";
import { StyleSheet, View } from "react-native";

import { useSelector, useDispatch } from 'react-redux';
import {  showNewGameModal, setConfirmModal } from "../redux/modalsSlice";

import * as Colors from '../styles/Colors';
import * as Sizes from '../styles/Sizes';
import Control from "./Control";
import { State } from "../types";


type GameListItemProps = {
  id: number,
}

const GameListItem: FC<GameListItemProps> = ({ id }) => {
  const dispatch = useDispatch();

  const game = useSelector((state: State) => state.game);

  function handlePressGameItem() {
    dispatch(showNewGameModal(id));
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
        textStyles={[{fontSize:35}]}
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
    borderRadius: Sizes.MED_BORDER_RADIUS,
    alignItems: 'center',
  },
  gameNameButton: {
    flexGrow: 1,
    backgroundColor: Colors.COLOR2,
    height: Sizes.MED_BUTTONS,
    alignItems: 'flex-start',
    paddingLeft: 20,
  },
  deleteButton: {
    backgroundColor: Colors.COLOR5,
    height: Sizes.SMALL_BUTTONS - 10,
    width: Sizes.SMALL_BUTTONS - 10,
  }
})

export default GameListItem;