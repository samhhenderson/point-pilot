import { FC, useState, useEffect } from "react";
import { StyleSheet, Text, View, Modal, TextInput, ScrollView, ViewBase } from "react-native";
import Checkbox from 'expo-checkbox';

import { useSelector, useDispatch } from 'react-redux';
import { hideNewGameModa, setConfirmModal } from "./modalsSlice";
import { changeActiveGame } from "../views/gameSlice";
import { changeActivePlayer, deletePlayer } from "../views/playerSlice";

import { State, Player } from "../types";
import * as Colors from '../styles/Colors';
import * as Sizes from '../styles/Sizes'
import { CommonStyles } from "../styles/CommonStyles";
import Control from "../components/Control";
import CheckBox from "../components/CheckBox";
import ConfirmModal from "./ConfirmModal";

const NewGameModal: FC = () => {
  const { 
    gameName, 
    useBid, 
    lowScoreWins, 
    teams 
  } = useSelector((state: State) => state.game.activeGame);
  const { newGame } = useSelector((state: State) => state.modals);
  const { playerList } = useSelector((state: State) => state.player);

  const [ modalConfirmFunc, setModalConfirmFunc ] = useState<Function | null>(null);

  const dispatch = useDispatch();

  const playerListArray:  JSX.Element[] = [];

  function handleDeletePlayer(player: Player) {
    dispatch(setConfirmModal({message: 'ARE YOU SURE'}));
    setModalConfirmFunc(() => dispatch(deletePlayer(player)));
  }

  playerList.forEach((player:Player) => {
    playerListArray.push(
      <View style={Styles.gameOption}>
        <CheckBox
          value={player.active}
          onValueChange={() => {dispatch(changeActivePlayer(player.name))}}
        />
        <Text>{player.name}</Text>
        <Control
            key={player.name}
            text={'X'}
            onPress={() => handleDeletePlayer(player)}
            textStyles={[{fontSize:40}]}
          />
      </View>
    )
  })

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={newGame.vis}
    >
      <View style={Styles.modal}>
        <View style={[CommonStyles.largeModal, Styles.largeModalChanges]}>
          <View style={Styles.header}>
            <Text style={[CommonStyles.text, {fontSize: 40}]}>GAME:</Text>
            <TextInput 
              style={Styles.textInput}
              onChangeText={text => dispatch(changeActiveGame({gameName: text}))}
              value={gameName}
            />
          </View>
          <View style={Styles.gameOption}>
            <CheckBox
              value={lowScoreWins}
              onValueChange={() => dispatch(changeActiveGame({lowScoreWins: !lowScoreWins}))}
            />
            <Text style={CommonStyles.text}>LOW SCORE WINS</Text>
          </View>
          <View style={Styles.gameOption}>
            <CheckBox
              value={useBid}
              onValueChange={() => {dispatch(changeActiveGame({useBid: !useBid}))}}
            />
            <Text style={CommonStyles.text}>BIDS</Text>
          </View>
          <View style={Styles.gameOption}>
            <CheckBox
              value={teams}
              onValueChange={() => {dispatch(changeActiveGame({teams: !teams}))}}
            />
            <Text style={CommonStyles.text}>TEAMS</Text>
          </View>
          <ScrollView>
            {playerListArray}
          </ScrollView>
          <Control
            onPress={() => dispatch(hideNewGameModa())}
            text={'X'}
            textStyles={[{fontSize:40}]}
          />
        </View>
      </View>
      <ConfirmModal
        onConfirm={modalConfirmFunc}
      />
    </Modal>
  );
};

export default NewGameModal;

const Styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  largeModalChanges: {
    flexDirection: 'column',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  textInput: {
    fontSize: 40,
    backgroundColor: Colors.COLOR3,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 2,
    borderColor: 'black',
    borderWidth: 1,
  },
  gameOption: {
    flexDirection: 'row',
    gap: 15,
  }
});
