//Expo and React imports
import { FC, useState, useEffect } from "react";
import { StyleSheet, Text, View, Modal, TextInput, ScrollView } from "react-native";

//Redux imports
import { useSelector, useDispatch } from 'react-redux';
import { hideNewGameModal, setConfirmModal } from "../redux/modalsSlice";
import { addGame, updateGame } from "../redux/gameSlice";
import { addPlayer } from "../redux/playerSlice";
import { addSession } from "../redux/sessionSlice";
import { addPlayerSession } from "../redux/playerSessionSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";

//Other imports
import { State, Game, NavigationPropType, PlayerSessionState} from "../types";
import * as Colors from '../styles/Colors';
import * as Sizes from '../styles/Sizes'
import { CStyles } from "../styles/CommonStyles";
import Control from "../components/Control";
import CheckBox from "../components/CheckBox";
import ConfirmModal from "./ConfirmModal";
import PlayerListItem from "../components/PlayerListItem";

type NewGameModalProps = {
  navigation: NavigationPropType,
}

const defaultGame: Game = {
  id: 0,
  name: '',
  useBid: false,
  lowScoreWins: false,
  teams: false,
  display: true,
}

const NewGameModal: FC<NewGameModalProps> = ({ navigation }) => {

  // REDUX / STATE HOOKS
  const modalsNewGame = useSelector((state: State) => state.modals.newGame);
  const player = useSelector((state: State) => state.player);
  const game = useSelector((state: State) => state.game);
  const tempPlayerSessions = useSelector((state: State) => state.playerSession.tempById);
  const dispatch = useDispatch();
  const dispatchThunk:ThunkDispatch<State, null, any> = useDispatch();

  const [ newPlayerName, setNewPlayerName ] = useState<string>('');
  const [ activeGame, setActiveGame ] = useState<Game>(defaultGame);
  
  useEffect(() => {
    if (modalsNewGame.vis) {
      setNewPlayerName('');

      // If we're editing a game, set the active game to that game
      // Otherwise, set the active game to a new game
      if (modalsNewGame.gameId !== 0) {
        setActiveGame(game.byId[modalsNewGame.gameId]);
      } else setActiveGame(defaultGame);
    }

  }, [modalsNewGame.vis])



  async function handlePlay () {

    //TEMPORARY - CREATE CUSTOM MODALS FOR THESE
    if (Object.keys(tempPlayerSessions).length < 2) {
      alert('Please select at least 2 players');
      return;
    }

    if (activeGame.name === '') {
      alert('Please enter a game name');
      return;
    }

    async function getGameId() {
      // If game doesn't exist, add it and get the id back
      try {
        if (activeGame.id === 0) {
          const addGameAction = await dispatchThunk(addGame(activeGame));
          return addGameAction.payload.id;
        // If we've changed the game, add it and get the id back
        } else if (JSON.stringify(activeGame) !== JSON.stringify(game.byId[activeGame.id])) {
          const updateGameAction = await dispatchThunk(updateGame(activeGame));
          return updateGameAction.payload.id;
        // Otherwise, just return the id
        } else return activeGame.id
      } catch (err) {
        console.log('GET GAME ID ', err)
      }
    }

    function setPlayerSessions(sessionId: number) {
      return Promise.all(Object.values(tempPlayerSessions).map(async (value) => {
        return dispatchThunk(addPlayerSession({
          playerId: value.playerId,
          sessionId,
          team: value.team,
        }))
      }))
    }
    try {
      const gameId = await getGameId();
      const sessionId = await dispatchThunk(addSession(gameId));
      // Add all player sessions to the database and redux state before navigating
      await setPlayerSessions(sessionId.payload.id);
      dispatch(hideNewGameModal());
      navigation.navigate('SessionView', {sessionId: sessionId.payload.id as number});
    } catch (err) {
      console.log('HANDLE PLAY ', err)
    }
  };

  function handleNewPlayerDone(): void {
    setNewPlayerName('');
    dispatchThunk(addPlayer(newPlayerName));
  }

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={modalsNewGame.vis}
    >
      <View style={Styles.modal}>
        <View style={[CStyles.largeModal, Styles.largeModalChanges]}>
          <View style={Styles.header}>
            <Text style={[CStyles.text, {fontSize: 30}]}>GAME:</Text>
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
            <Text style={[CStyles.text, Styles.listItemText]}>LOW SCORE WINS</Text>
          </View>
          <View style={Styles.listItem}>
            <CheckBox
              value={activeGame.useBid}
              onValueChange={() => setActiveGame({
                ...activeGame, 
                useBid: !activeGame.useBid,
              })}
            />
            <Text style={[CStyles.text, Styles.listItemText]}>BIDS</Text>
          </View>
          <View style={Styles.listItem}>
            <CheckBox
              value={activeGame.teams}
              onValueChange={() => setActiveGame({
                ...activeGame, 
                teams: !activeGame.teams,
              })}
            />
            <Text style={[CStyles.text, Styles.listItemText]}>TEAMS</Text>
          </View>
          <ScrollView style={Styles.playerListView}>
            <View style={Styles.playerListCont}>
              {player.allIds ?
                player.allIds.map((id) => {
                  return (
                    <PlayerListItem 
                      key={id}
                      id={id}
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    borderRadius: Sizes.SMALL_BORDER_RADIUS,
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
    borderRadius: Sizes.MED_BORDER_RADIUS,
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
