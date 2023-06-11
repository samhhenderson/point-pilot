import { FC, useState, useEffect } from "react";
import { StyleSheet, Text, View, Modal, TextInput, ScrollView, ViewBase } from "react-native";

import { useSelector, useDispatch } from 'react-redux';
import { hideNewGameModa, setConfirmModal } from "../modals/modalsSlice";
import { changeActivePlayer, deletePlayer } from "../views/playerSlice";

import { State, Player, NavigationPropType } from "../types";
import * as Colors from '../styles/Colors';
import * as Sizes from '../styles/Sizes'
import { CommonStyles } from "../styles/CommonStyles";
import Control from "./Control";
import CheckBox from "./CheckBox";
import ConfirmModal from "../modals/ConfirmModal";

type PlayerListItemProps = {
  player: Player,
  setModalConfirmFunc: any,
}

const PlayerListItem: FC<PlayerListItemProps> = ({ player, setModalConfirmFunc}) => {

  const dispatch = useDispatch();

  function handleDeletePlayer(player: Player) {
    setModalConfirmFunc(() => () => dispatch(deletePlayer(player)));
    dispatch(setConfirmModal({message: `Remove player ${player.name} from list?`}));
  }


  return (
      <View style={Styles.playerListItem}>
        <View style={Styles.checkboxNameCont}>
          <CheckBox
            value={player.active}
            onValueChange={() => {dispatch(changeActivePlayer(player.name))}}
          />
          <Text style={[CommonStyles.text]}>{player.name}</Text>
        </View>
        <Control
            key={player.name}
            text={'X'}
            pressableStyles={[Styles.deleteButton]}
            onPress={() => handleDeletePlayer(player)}
            textStyles={[{fontSize:40}]}
          />
      </View>
  )
};

export default PlayerListItem;

const Styles = StyleSheet.create({
  textInput: {
    fontSize: 30,
    backgroundColor: Colors.COLOR3,
    paddingLeft: 10,
    borderRadius: 5,
    width: 190,
  },
  playerListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  checkboxNameCont: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  deleteButton: {
    width: Sizes.smallButtons, 
    height: Sizes.smallButtons,
    backgroundColor: Colors.COLOR5,
  },
  addButton: {
    borderRadius: 35,
    backgroundColor: 'green',
    borderColor: 'white',
    borderWidth: 1,
  },
});
