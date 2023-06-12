import { FC, useState, useEffect } from "react";
import { StyleSheet, Text, View, Modal, TextInput, ScrollView, ViewBase } from "react-native";
import Checkbox from 'expo-checkbox';

import { useSelector, useDispatch } from 'react-redux';
import { hideNewGameModa } from "./modalsSlice";
import { changeActiveGame, addGame } from "../views/gameSlice";
import { addPlayer, addPlayerToDB } from "../views/playerSlice";

import { State, Player, NavigationPropType } from "../types";
import * as Colors from '../styles/Colors';
import * as Sizes from '../styles/Sizes'
import { CommonStyles } from "../styles/CommonStyles";
import Control from "../components/Control";
import CheckBox from "../components/CheckBox";
import ConfirmModal from "./ConfirmModal";
import PlayerListItem from "../components/PlayerListItem";

type NewGameModalProps = {
  navigation: NavigationPropType,
}

const NewGameModal: FC<NewGameModalProps> = ({ navigation }) => {
  const { 
    gameName, 
    useBid, 
    lowScoreWins, 
    teams 
  } = useSelector((state: State) => state.game.activeGame);
  const { newGame } = useSelector((state: State) => state.modals);
  const { playerList } = useSelector((state: State) => state.player);

  const [ newPlayerName, setNewPlayerName ] = useState<string>();

  const dispatch = useDispatch();

  function handlePlay () {
    navigation.navigate('Game')
    dispatch(hideNewGameModa())
    dispatch(addGame({gameName, useBid, lowScoreWins, teams}))
  }

  function handleNewPlayerDone() {
    setNewPlayerName('');
    dispatch(addPlayer({name: newPlayerName}));
  }

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={newGame.vis}
    >
      <View style={Styles.modal}>
        <View style={[CommonStyles.largeModal, Styles.largeModalChanges]}>
          <View style={Styles.header}>
            <Text style={[CommonStyles.text, {fontSize: 30}]}>GAME:</Text>
            <TextInput 
              style={Styles.textInput}
              onChangeText={text => dispatch(changeActiveGame({gameName: text}))}
              value={gameName}
              returnKeyType="done"
            />
          </View>
          <View style={Styles.listItem}>
            <CheckBox
              value={lowScoreWins}
              onValueChange={() => dispatch(changeActiveGame({lowScoreWins: !lowScoreWins}))}
            />
            <Text style={[CommonStyles.text, Styles.listItemText]}>LOW SCORE WINS</Text>
          </View>
          <View style={Styles.listItem}>
            <CheckBox
              value={useBid}
              onValueChange={() => {dispatch(changeActiveGame({useBid: !useBid}))}}
            />
            <Text style={[CommonStyles.text, Styles.listItemText]}>BIDS</Text>
          </View>
          <View style={Styles.listItem}>
            <CheckBox
              value={teams}
              onValueChange={() => {dispatch(changeActiveGame({teams: !teams}))}}
            />
            <Text style={[CommonStyles.text, Styles.listItemText]}>TEAMS</Text>
          </View>
          <ScrollView style={Styles.playerListView}>
            <View style={Styles.playerListCont}>
              {playerList.map((player, i) => (
                <PlayerListItem
                  key={i}
                  player={player}
                />
              ))}
              <TextInput
                style={Styles.textInput}
                onChangeText={text => setNewPlayerName(text)}
                value={newPlayerName}
                onSubmitEditing={handleNewPlayerDone}
                returnKeyType="done"
              />
            </View>
          </ScrollView>
          <View style={Styles.bottomButtonsCont}>
            <Control
              onPress={handlePlay}
              pressableStyles={[Styles.playButton]}
              text={'PLAY!'}
              textStyles={[{fontSize:30}]}
            />
            <Control
              onPress={() => dispatch(hideNewGameModa())}
              pressableStyles={[Styles.cancelButton]}
              text={'CANCEL'}
              textStyles={[{fontSize:30}]}
            />
          </View>
        </View>
      </View>
      <ConfirmModal
        navigation={navigation}
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
    fontSize: 30,
    backgroundColor: Colors.COLOR3,
    paddingLeft: 10,
    borderRadius: 5,
    width: 190,
    height: 48,
  },
  listItem: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
  listItemText: {
    fontSize: 20,
  },
  playerListView: {
    borderColor: Colors.COLOR1,
    borderWidth: 2,
    borderRadius: 10,
  },
  playerListCont: {
    gap: 10,
    padding: 10,
  },
  playerListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addButton: {
    borderRadius: 35,
    backgroundColor: 'green',
    borderColor: 'white',
    borderWidth: 1,
    width: 20,
    height: 20,
  },
  bottomButtonsCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  cancelButton: {
    flex: 1.4,
    backgroundColor: Colors.COLOR5,
  },
  playButton: {
    flex: 1,
  },
});
