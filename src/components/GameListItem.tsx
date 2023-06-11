import { FC, useRef } from "react";
import { StyleSheet, Text, View, Pressable, LayoutChangeEvent } from "react-native";

import { useSelector, useDispatch } from 'react-redux';
import { showNumberModal, hideNumberModal } from "../modals/modalsSlice";

import * as Colors from '../styles/Colors';
import * as Sizes from '../styles/Sizes';
import { CommonStyles } from "../styles/CommonStyles";
import Control from "./Control";

type GameListItemProps = {
  name: string,
}

const GameListItem: FC<GameListItemProps> = ({ name }) => {
  const dispatch = useDispatch();

  return (
    <View style={Styles.container} key={name}>
      <Control
          onPress={() => console.log('play this fucker!')}
          text={name}
          pressableStyles={[Styles.gameNameButton]}
          textStyles={[{fontSize:30}]}
        />
      <Control
          onPress={() => console.log('delete this fucker!')}
          text={'X'}
          pressableStyles={[Styles.deleteButton]}
          textStyles={[{fontSize:40}]}
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
  },
  gameNameButton: {
    flexGrow: 1,
    backgroundColor: Colors.COLOR2,
    borderRadius: 2,
    height: Sizes.smallButtons,
  },
  deleteButton: {
    backgroundColor: Colors.COLOR5,
    height: Sizes.smallButtons,
    borderRadius: 2,
  }
})

export default GameListItem;