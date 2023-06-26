import { FC, useState, useEffect } from "react";
import { StyleSheet, Text, View, Modal, TextInput, ScrollView, ViewBase } from "react-native";

import { useSelector, useDispatch } from 'react-redux';
import { hideNewGameModal, setConfirmModal } from "../redux/modalsSlice";
import { 
  setTempPlayerSession, 
  deleteTempPlayerSession,
  changeTempPlayerSessionTeam,
} from "../redux/playerSessionSlice";

import { State, Player, NavigationPropType, PlayerSession } from "../types";
import * as Colors from '../styles/Colors';
import * as Sizes from '../styles/Sizes'
import { CStyles } from "../styles/CommonStyles";
import Control from "./Control";
import CheckBox from "./CheckBox";
import ConfirmModal from "../modals/ConfirmModal";

type PlayerListItemProps = {
  id: number,
  teams?: boolean,
}

const PlayerListItem: FC<PlayerListItemProps> = ({ id, teams = false}) => {
  const tempPlayerSession = useSelector((state: State) => state.playerSession.tempById[id]);
  const player: Player = useSelector((state: State) => state.player.byId[id]);
  const dispatch = useDispatch();

  const [ active, setActive ] = useState<boolean>(false);

  function handleChangeActive() {
    if (!active) {
      dispatch(setTempPlayerSession(
        {
          id: player.id,
          playerId: player.id,
          sessionId: 0,
          score: 0,
          bid: 0,
          team: 1,
        } as PlayerSession
      ));
    } else {
      dispatch(deleteTempPlayerSession(player.id));
    }
    setActive(!active);
  }

  function handleDeletePlayer() {
    dispatch(setConfirmModal({
      message: `Remove ${player.name} from player list?`,
      confirmFunc: 'deletePlayer',
      confirmArgs: [player.id],
    }))
  }

 return (
    <View style={Styles.playerListItem}>
      <View style={Styles.checkboxNameCont}>
        <CheckBox
          value={active}
          onValueChange={handleChangeActive}
        />
        {teams ?
          <Control
            text={tempPlayerSession ? tempPlayerSession.team.toString() : ''}
            onPress={() => dispatch(changeTempPlayerSessionTeam(player.id))}
            pressableStyles={[Styles.teamButton]}
          /> : null
        }
        <Text 
          style={[CStyles.text, {flexShrink: 1}]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >{player.name}</Text>
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
    width: Sizes.SMALL_BUTTONS,
    height: Sizes.SMALL_BUTTONS,
    backgroundColor: Colors.COLOR1,
  },
  checkboxNameCont: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    flexShrink: 1,
  },
  deleteButton: {
    width: Sizes.SMALL_BUTTONS -10, 
    height: Sizes.SMALL_BUTTONS -10,
    backgroundColor: Colors.COLOR5,
  },
  addButton: {
    borderRadius: 35,
    backgroundColor: 'green',
    borderColor: 'white',
    borderWidth: 1,
  },
});

