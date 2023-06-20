//Expo and React imports
import { FC, useState, useEffect } from "react";
import { StyleSheet, Text, View, Modal, TextInput, ScrollView, ViewBase } from "react-native";
import Checkbox from 'expo-checkbox';

//Redux imports
import { useSelector, useDispatch } from 'react-redux';
import { hideNewGameModal, setConfirmModal } from "../redux/modalsSlice";
import { addGame, updateGame } from "../redux/gameSlice";
import { addPlayer } from "../redux/playerSlice";
import { addSession } from "../redux/sessionSlice";
import { addPlayerSession } from "../redux/playerSessionSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";

//Other imports
import { State, Game, NavigationPropType } from "../types";
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

  const { modals, player, game } = useSelector((state: State) => state);

  const [ newPlayerName, setNewPlayerName ] = useState<string>('');
  const [ activeGame, setActiveGame ] = useState<Game>({
    id: 0,
    name: '',
    useBid: false,
    lowScoreWins: false,
    teams: false,
    display: true,
  });

  useEffect(() => {
    if (modals.newGame.vis) {
      setNewPlayerName('');

      // If we're editing a game, set the active game to that game
      // Otherwise, set the active game to a new game
      if (modals.newGame.gameId !== 0) {
        setActiveGame(game.byId[modals.newGame.gameId]);
      } else {
        setActiveGame({
          id: 0,
          name: '',
          useBid: false,
          lowScoreWins: false,
          teams: false,
          display: true,
        });
      }
    }

  }, [modals.newGame.vis])

  const dispatch = useDispatch();
  const dispatchThunk:ThunkDispatch<State, null, any> = useDispatch();

  function handlePlay () {

    // Only show the confirm modal if we've changed an existing game
    if (activeGame.id !== 0 && JSON.stringify(activeGame) !== 
      JSON.stringify(game.byId[activeGame.id])) {
        // dispatch(setConfirmModal({
        //   vis: true,
        //   message: 'Change existing game? This may affect previous sessions.',
        //   confirmFunc: 'updateGame',
        //   confirmArgs: [activeGame],
        // }))
    } else if (activeGame.id === 0) {
      // dispatch addSession action only after addGame action is complete
      // this is b/c the SQLite ID doesn't exist yet, need to get it first
      dispatchThunk(addGame(activeGame))
      .then((action) => {
        dispatchThunk(addSession(action.payload.id))
        .then((action) => {
          dispatchThunk(addPlayerSession({
            playerId: player.activePlayerId,
            sessionId: action.payload.id,
          }))
          dispatch(hideNewGameModal());
        })
      });
    } else {
      dispatchThunk(addSession(activeGame.id));
      dispatch(hideNewGameModal());
      navigation.navigate('Session');
    }
  }

  function handleNewPlayerDone(): void {
    setNewPlayerName('');
    dispatchThunk(addPlayer(newPlayerName));
  }

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={modals.newGame.vis}
    >
      <View style={Styles.modal}>
        <View style={[CommonStyles.largeModal, Styles.largeModalChanges]}>
          <View style={Styles.header}>
            <Text style={[CommonStyles.text, {fontSize: 30}]}>GAME:</Text>
            <TextInput 
              style={Styles.textInput}
              onChangeText={text => setActiveGame({...activeGame, name: text})}
              value={activeGame.name}
              returnKeyType="done"
            />
          </View>
          <View style={Styles.listItem}>
            <CheckBox
              value={!!activeGame.lowScoreWins}
              onValueChange={() => setActiveGame({
                ...activeGame, 
                lowScoreWins: !activeGame.lowScoreWins,
              })}
            />
            <Text style={[CommonStyles.text, Styles.listItemText]}>LOW SCORE WINS</Text>
          </View>
          <View style={Styles.listItem}>
            <CheckBox
              value={activeGame.useBid}
              onValueChange={() => setActiveGame({
                ...activeGame, 
                useBid: !activeGame.useBid,
              })}
            />
            <Text style={[CommonStyles.text, Styles.listItemText]}>BIDS</Text>
          </View>
          <View style={Styles.listItem}>
            <CheckBox
              value={activeGame.teams}
              onValueChange={() => setActiveGame({
                ...activeGame, 
                teams: !activeGame.teams,
              })}
            />
            <Text style={[CommonStyles.text, Styles.listItemText]}>TEAMS</Text>
          </View>
          <ScrollView style={Styles.playerListView}>
            <View style={Styles.playerListCont}>
              {player.byId ?
                Object.keys(player.byId).map((pla) => {
                  const p = player.byId[pla];
                  return (
                    <PlayerListItem 
                      key={p.name}
                      player={p}
                      teams={activeGame.teams}
                    />
                  )
                }) : null
              }
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
              onPress={() => dispatch(hideNewGameModal())}
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
