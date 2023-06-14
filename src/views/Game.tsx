import { FC, useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView} from "react-native";

import { useSelector, useDispatch } from 'react-redux';
import { setConfirmModal } from "../modals/modalsSlice";

import { Player, State, NavigationPropType } from "../types";
import * as Colors from './../styles/Colors';
import { CommonStyles } from "../styles/CommonStyles";
import ActivePlayer, { Styles as APStyles } from "../components/ActivePlayer";
import NumberModal from "../modals/NumberModal";
import ConfirmModal from "../modals/ConfirmModal";
import Control from "../components/Control";

type GameProps = {
  navigation: NavigationPropType,
}

const Game: FC<GameProps> = ({ navigation }) => {
  const [bidTitle, setBidTitle] = useState('');
  
  const dispatch = useDispatch();

  const { byId } = useSelector((state: State) => state.player);
  const { name, useBid } = useSelector((state: State) => state.game.activeGame);

  useEffect(() => {
    if (useBid) setBidTitle('BID')
  }, [])

  function endGame() {
    const winners: string[] = [];
    for (const player in byId) {
      if (byId[player].place === 1) {
        winners.push(player);
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
      confirmFunc: 'endGame',
    }))
  }

  return (
      <View style={Styles.app}>
        <ScrollView contentContainerStyle={Styles.game}>
          <Text style={[CommonStyles.text, Styles.title]}>{name}</Text>
          <View style={Styles.playerContainer}>
            <View style={[APStyles.container, Styles.headings]} >
              <Text style={[CommonStyles.text, {fontSize: 20}]}>NAME</Text>
              <View style={APStyles.pointsContainer}>
                <Text style={[CommonStyles.text, Styles.bidAndScoreText]}>{bidTitle}</Text>
                <Text style={[CommonStyles.text, Styles.bidAndScoreText]}>SCORE</Text>
              </View>
            </View>
            {Object.keys(byId).map((player) => {
              const p = byId[player];
              if (p.active) {
                return (
                  <ActivePlayer 
                    key={player}
                    bid={p.bid}
                    name={player} 
                    score={p.score}
                  />
                )
              }
            })}
          </View>
          <View style={Styles.endGameContainer}>
            <Control
              onPress={endGame}
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

export default Game;

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