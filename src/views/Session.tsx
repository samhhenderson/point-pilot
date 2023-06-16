import { FC, useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView} from "react-native";

import { useSelector, useDispatch } from 'react-redux';
import { setConfirmModal } from "../redux/modalsSlice";

import { State, NavigationPropType, Game, Session, Player } from "../types";
import * as Colors from '../styles/Colors';
import { CommonStyles } from "../styles/CommonStyles";
import ActivePlayer, { Styles as APStyles } from "../components/ActivePlayer";
import NumberModal from "../modals/NumberModal";
import ConfirmModal from "../modals/ConfirmModal";
import Control from "../components/Control";

type SessionProps = {
  navigation: NavigationPropType,
}

const Session: FC<SessionProps> = ({ navigation }) => {

  const dispatch = useDispatch();

  const { player, session, game } = useSelector((state: State) => state);
  
  const [ activeGame, setActiveGame ] = useState<Game>({
    id: 0, 
    name: 'Game', 
    lowScoreWins: false, 
    useBid: false, 
    teams: false, 
    display: false
  });

  // List of player Id's that have a session with the active sessionID
  const [ activePlayerIds, setActivePlayerIds ] = useState<Player[]>([])

  // Go in reverse, since the active session is most likely the last one
  for (let i = session.allIds.length - 1; i >= 0; i--) {
    if (!session.byId[session.allIds[i]].complete) {
      let activeSession = session.byId[session.allIds[i]]
      setActiveGame(game.byId[activeSession.gameId]);
    }
  }

  function endSession() {
    const winners: string[] = [];
    for (const p in player.byId) {
      if (player.byId[p].place === 1) {
        winners.push(p);
      }
    }
    let names = '';
    let plural= '';
    if (winners.length === 1) {
      names = winners[0];
    } else {
      names = winners.join(' and ');
      plural = 's';
    }
    dispatch(setConfirmModal({
      message: `End game? ${names} will be the winner${plural}!`,
      confirmFunc: 'endSession',
    }))
  }

  return (
      <View style={Styles.app}>
        <ScrollView contentContainerStyle={Styles.game}>
          <Text style={[CommonStyles.text, Styles.title]}>{activeGame!.name}</Text>
          <View style={Styles.playerContainer}>
            <View style={[APStyles.container, Styles.headings]} >
              <Text style={[CommonStyles.text, {fontSize: 20}]}>NAME</Text>
              <View style={APStyles.pointsContainer}>
                <Text style={[CommonStyles.text, Styles.bidAndScoreText]}>
                  {activeGame!.useBid ? 'BID' : ''}
                  </Text>
                <Text style={[CommonStyles.text, Styles.bidAndScoreText]}>SCORE</Text>
              </View>
            </View>
            {player.allIds.map(id => {
              const p = player.byId[id];
              if (p.active) {
                return (
                  <ActivePlayer 
                    key={p.id}
                    bid={p.bid}
                    name={p.name} 
                    score={p.score}
                  />
                )
              }
            })}
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

export default Session;

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
  },
  endGameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
  },
  endGameButton: {
    width: 200,
    backgroundColor: Colors.COLOR5,
    borderRadius: 2,
  }
});