import { FC, useRef, useState } from "react";
import { StyleSheet, Text, View, Pressable, LayoutChangeEvent } from "react-native";

import { useSelector, useDispatch } from 'react-redux';
import { deleteSession } from "../redux/sessionSlice";
import { deletePlayerSession } from "../redux/playerSessionSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";

import * as Colors from '../styles/Colors';
import * as Sizes from '../styles/Sizes';
import { CStyles } from "../styles/CommonStyles";
import Control from "./Control";
import { 
  State, 
  PlayerSessionIdPlace, 
  Session, 
  PlayerSessionState, 
  GameState 
} from "../types";
import NewConfirmModal from "../modals/NewConfirmModal";
import SessionModal from "../modals/SessionModal";


type SessionListItemProps = {
  sessionId: number,
}

const SessionListItem: FC<SessionListItemProps> = ({ sessionId }) => {
  //Redux
  const dispatch = useDispatch();
  const dispatchThunk:ThunkDispatch<State, null, any> = useDispatch();
  const thisSession = useSelector((state: State) => state.session.byId[sessionId]);
  const game = useSelector((state: State) => state.game);
  const playerSession = useSelector((state: State) => state.playerSession);
  const player = useSelector((state: State) => state.player);
  
  //Hooks
  const [ ConfirmModalState, setConfirmModalState ] = useState({
    vis: false, 
    message: '',
    confirmFunc: () => console.log('confirmFunc not set'),
    cancelFunc: () => console.log('cancelFunc not set'),
  });

  const [ sessionModalVis, setSessionModalVis ] = useState(false);
  const [ isPressed, setIsPressed ] = useState(false);
  
  //GET TITLE, DATES, AND WINNER TEXT
  // REPEATED LOGIC FROM SESSIONVIEW - FIX LATER
  function calculatePlaces (
    thisSession: Session, 
    game: GameState,
    playerSession: PlayerSessionState
  ){
    const playerSessionIds = playerSession.allIds.filter(id => {
      return playerSession.byId[id].sessionId === sessionId
    })
    const playerSessions = playerSessionIds.map(id => playerSession.byId[id]);
    const lowScoreWins = game.byId[thisSession.gameId].lowScoreWins;
    
    playerSessions.sort((a, b) => {
      if (lowScoreWins) return a.score - b.score;
      else return b.score - a.score;
    });
    const places: PlayerSessionIdPlace[] = [];
    let currentPlace = 1;
    playerSessions.forEach((ps, i) => {
      if (i === 0 || ps.score === playerSessions[i - 1].score) {
        places.push({playerSessionId: ps.id, place: currentPlace})
      } else {
        currentPlace++;
        places.push({playerSessionId: ps.id, place: currentPlace})
      }
    })
    return places;
   };
    
  const playerSessionIdPlaces = calculatePlaces(thisSession, game, playerSession);

  const winners: string[] = [];
  for (const psip of playerSessionIdPlaces) {
    if (psip.place === 1) {
      winners.push(player.byId[playerSession.byId[psip.playerSessionId]
          .playerId].name);
    } else break;
  }
  let names = '';
  if (winners.length === 1) {
    names = winners[0];
  } else {
    names = winners.join(' & ');
  }
  const winnerText = 'Winner' + (winners.length > 1 ? 's' : '') + ': ' + names;
  const gameName = game.byId[thisSession.gameId].name;
  const date = thisSession.date;

  function handleDeleteSessionItem() {
    setConfirmModalState({
      vis: true,
      message: `Remove this Session from History?`,
      confirmFunc: () => {
        playerSession.allIds.forEach((playerSessionId) => {
          if (playerSession.byId[playerSessionId].sessionId === thisSession.id) {
            dispatchThunk(deletePlayerSession(playerSessionId));
          }
        })
        dispatchThunk(deleteSession(thisSession.id));
        setConfirmModalState((state) => ({...state, vis: false}))
      },
      cancelFunc: () => setConfirmModalState((state) => ({...state, vis: false})),
    })
  }

  return (
    <View style={Styles.container}>
      <Pressable
        style={[
          Styles.sessionNameButton,
          { opacity: isPressed ? 0.8 : 1.0 },
        ]}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        onPress={() => setSessionModalVis(true)}
      >
        <View style={Styles.titleDateCont}>
          <Text 
            style={[CStyles.textDark, {fontSize: 30, flexShrink: 1}]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >{gameName}</Text>
          <Text style={[CStyles.textDark]}>{date}</Text>
        </View>
        <View style={Styles.winner}>
          <Text 
            style={[CStyles.textDark, {fontSize: 20}]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >{winnerText}</Text>
        </View>
      </Pressable>
      <Control
        onPress={handleDeleteSessionItem}
        text={'X'}
        pressableStyles={[Styles.deleteButton]}
        textStyles={[{fontSize:20}]}
      />
      <NewConfirmModal
        vis={ConfirmModalState.vis}
        message={ConfirmModalState.message}
        confirmFunc={ConfirmModalState.confirmFunc}
        cancelFunc={ConfirmModalState.cancelFunc}
      />
      <SessionModal
        vis={sessionModalVis}
        thisSession={thisSession}
        setSessionModalVis={setSessionModalVis}
        playerSessionIdPlaces={playerSessionIdPlaces}
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
  sessionNameButton: {
    flexGrow: 1,
    backgroundColor: Colors.COLOR3,
    borderRadius: Sizes.SMALL_BORDER_RADIUS,
    height: Sizes.MED_BUTTONS,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: Sizes.MED_BUTTONS,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    padding: 10,
  },
  titleDateCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  winner: {
    width: '100%',
    alignContent: 'flex-start'
  },
  deleteButton: {
    backgroundColor: Colors.COLOR5,
    height: Sizes.SMALL_BUTTONS - 10,
    width: Sizes.SMALL_BUTTONS - 10,
    borderRadius: Sizes.SMALL_BORDER_RADIUS,
  }
})

export default SessionListItem;