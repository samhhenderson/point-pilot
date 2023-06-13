import { FC, useState, useEffect } from "react";
import { StyleSheet, Text, View, Modal, TextInput, ScrollView, ViewBase } from "react-native";

import { useSelector, useDispatch } from 'react-redux';
import { hideNewGameModa, setConfirmModal } from "../modals/modalsSlice";
import { changeActivePlayer, deletePlayer, changeTeam} from "../views/playerSlice";

import { State, Player, NavigationPropType } from "../types";
import * as Colors from '../styles/Colors';
import * as Sizes from '../styles/Sizes'
import { CommonStyles } from "../styles/CommonStyles";
import Control from "./Control";
import CheckBox from "./CheckBox";
import ConfirmModal from "../modals/ConfirmModal";

type PlayerListItemProps = {
  player: Player,
}

const PlayerListItem: FC<PlayerListItemProps> = ({ player }) => {
  const { teams } = useSelector((state: State) => state.game.activeGame)
  const dispatch = useDispatch();

  function handleDeletePlayer() {
    dispatch(setConfirmModal({
      message: `Remove ${player.name} from player list?`,
      confirmFunc: 'deletePlayer',
      confirmArgs: [player.name],
    }))
  }

 return (
    <View style={Styles.playerListItem}>
      <View style={Styles.checkboxNameCont}>
        <CheckBox
          value={!!player.active}
          onValueChange={() => {dispatch(changeActivePlayer(player.name))}}
        />
        {teams ?
        <Control
          text={player.team.toString()}
          onPress={() => dispatch(changeTeam(player.name))}
          pressableStyles={[Styles.teamButton]}
        /> : null
        }
        <Text style={[CommonStyles.text]}>{player.name}</Text>
      </View>
      <Control
        text={'X'}
        pressableStyles={[Styles.deleteButton]}
        onPress={handleDeletePlayer}
        textStyles={[{fontSize:20}]}
      />
    </View>
  )
};

export default PlayerListItem;

const Styles = StyleSheet.create({
  playerListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  teamButton: {
    width: Sizes.smallButtons,
    height: Sizes.smallButtons,
    backgroundColor: Colors.COLOR1,
  },
  checkboxNameCont: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  deleteButton: {
    width: Sizes.smallButtons -10, 
    height: Sizes.smallButtons -10,
    backgroundColor: Colors.COLOR5,
  },
  addButton: {
    borderRadius: 35,
    backgroundColor: 'green',
    borderColor: 'white',
    borderWidth: 1,
  },
});
