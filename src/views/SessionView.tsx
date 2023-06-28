import { FC, useState, useCallback, useMemo } from "react";
import { StyleSheet, Text, View, ScrollView} from "react-native";
import { useFocusEffect, StackActions } from "@react-navigation/native";

import { useSelector, useDispatch } from 'react-redux';
import { setConfirmModal } from "../redux/modalsSlice";

import { State, 
  NavigationPropType, 
  GameState, 
  Session, 
  PlayerSessionState,
  PlayerSessionIdPlace,
} from "../types";
import * as Colors from '../styles/Colors';
import * as Sizes from '../styles/Sizes';
import { CStyles } from "../styles/CommonStyles";
import ActivePlayer, { Styles as APStyles } from "../components/ActivePlayer";
import NumberModal from "../modals/NumberModal";
import ConfirmModal from "../modals/ConfirmModal";
import Control from "../components/Control";

type SessionViewProps = {
  navigation: NavigationPropType,
  route: any,
}

const SessionView: FC<SessionViewProps> = ({ navigation, route }) => {
  // If no sessionId is passed, go back to Homes
  console.log('SESSIONVIEW 30', route.params)
  const { sessionId } = route.params;
  const dispatch = useDispatch();

  
  const player = useSelector((state: State) => state.player);
  const thisSession = useSelector((state: State) => state.session.byId[sessionId]);
  const game = useSelector((state: State) => state.game);
  const playerSession  = useSelector((state: State) => state.playerSession);

  useFocusEffect(
    useCallback(() => {
      console.log('SESSIONVIEW FOCUSED')
      return () => console.log('SESSIONVIEW BLURRED')
    }, [])
  )

  if (!thisSession) {
    console.log('SESSIONVIEW 48 SENT HOME')
    navigation.dispatch(StackActions.pop())
    return null;
  }

  //REPEATED FROM SESSIONMODAL - REFACTOR
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
  
  const activePlayerSessionIds = playerSessionIdPlaces.map(psip => psip.playerSessionId);


  if (!thisSession) {
    console.log('SESSIONVIEW30 SENT HOME')
    navigation.navigate('Home');
    return null;
  }
    
  const activeGame = game.byId[thisSession.gameId];

  function endSession() {

    const winners: string[] = [];
    for (const psip of playerSessionIdPlaces) {
      if (psip.place === 1) {
        winners.push(player.byId[playerSession.byId[psip.playerSessionId]
            .playerId].name);
      } else break;
    }
    let names = '';
    let plural= '';
    if (winners.length === 1) {
      names = winners[0];
    } else {
      names = winners.join(' & ');
      plural = 's';
    }
    dispatch(setConfirmModal({
      message: `End game? ${names} will be the winner${plural}!`,
      confirmFunc: 'endSession',
      confirmArgs: [sessionId],
    }))
  }

  return (
      <View style={Styles.app}>
        <ScrollView contentContainerStyle={Styles.game}>
          <Text style={[CStyles.text, CStyles.title]}>
            {activeGame.name}
          </Text>
          <View style={Styles.playerContainer}>
            <View style={[APStyles.container, Styles.headings]} >
              <Text style={[CStyles.text, {fontSize: 20}]}>NAME</Text>
              <View style={APStyles.pointsContainer}>
                <Text style={[CStyles.text, Styles.bidAndScoreText]}>
                  {activeGame!.useBid ? 'BID' : ''}
                  </Text>
                <Text style={[CStyles.text, Styles.bidAndScoreText]}>
                  SCORE
                </Text>
              </View>
            </View>
            {activePlayerSessionIds.length > 0 ? 
              activePlayerSessionIds.map(id => {
                return (
                  <ActivePlayer 
                    key={id}
                    playerSessionId={id}
                    useBid={activeGame.useBid}
                  />
                )
              }): null}
          </View>
          <View style={Styles.endGameContainer}>
            <Control
              onPress={endSession}
              text={'END GAME'}
              pressableStyles={[Styles.endGameButton]}
              textStyles={[{fontSize:30}]}
            />
          </View>
        </ScrollView>
        <NumberModal/>
        <ConfirmModal
          navigation={navigation}
        />
      </View>
  );
};

export default SessionView;

const Styles = StyleSheet.create({
  app: {
    backgroundColor: Colors.COLOR1,
    flex: 1,
  },
  game: {
    flexGrow: 1,
    backgroundColor: Colors.COLOR1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 50,
    textAlign: 'center',
    marginTop: 30,
  },
  playerContainer: {
    width: '100%',
    padding: 10,
    gap: 10,
  },
  headings: {
    borderColor: 'transparent',
    marginBottom: -15,
    marginTop: -15,
  },
  bidAndScoreText: {
    fontSize: 20,
    width: 70,
    textAlign: 'center',
  },
  endGameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
  },
  endGameButton: {
    width: 200,
    backgroundColor: Colors.COLOR5,
    borderRadius: Sizes.SMALL_BORDER_RADIUS,
  }
});