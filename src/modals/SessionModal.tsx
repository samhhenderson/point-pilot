import { FC, useState, useEffect, useMemo, useCallback } from "react";
import { StyleSheet, Text, View, Modal, ViewStyle } from "react-native";
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from "@reduxjs/toolkit";

import { 
  State, 
  Session, 
  NavigationPropType, 
  PlayerSessionIdPlace,
  PlayerSession,
  SessionModalState,
} from "../types";
import * as Colors from './../styles/Colors';
import * as Sizes from './../styles/Sizes'
import { CStyles } from "../styles/CommonStyles";
import Control from "../components/Control";
import { Styles as APStyles } from "../components/ActivePlayer";

type SessionModalProps = {
  sessionModalState: SessionModalState,
  setSessionModalState: any,
}

const SessionModal: FC<SessionModalProps> = ({
  sessionModalState,
  setSessionModalState,

}) => {
  // HOOKS / STATE
  const game = useSelector((state: State) => state.game);

  const playerSession = useSelector((state: State) => state.playerSession);

  const player = useSelector((state: State) => state.player);
  const navigation = useNavigation<NavigationPropType>();
  const [viewWidth, setViewWidth] = useState(0);

  const playerSessions = sessionModalState.playerSessionIdPlaces.map(psip => {
    return playerSession.byId[psip.playerSessionId]
  })

  // NON STATE VARIABLES
  if (sessionModalState.thisSession === null) return null;

  const gameName = game.byId[sessionModalState.thisSession.gameId].name;
  const date = sessionModalState.thisSession.date;
  const title = gameName + ' - ' + date;

  // HANDLE FUNCTIONS
  function handleReOpen() {
    navigation.navigate('Game')
    navigation.navigate(
      'SessionView', 
      { sessionId: sessionModalState.thisSession!.id }
    )
    setSessionModalState((state:SessionModalState) => {
      return {...state, vis: false}
    })
  }

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={sessionModalState.vis}
    >
      <View style={Styles.modal}>
        <View 
          style={[CStyles.largeModal, Styles.largeModalChanges]}
          onLayout={(event) => {
            setViewWidth(event.nativeEvent.layout.width)}}
        > 
          <View style={Styles.titleCont}>
            <Text style={[
              CStyles.text, 
              {fontSize: 40, color: Colors.DARK_TEXT}
            ]}>{title}</Text>
          </View>
          <View style={Styles.playerContainer}>
            <View style={[APStyles.container, Styles.headings]} >
              <Text style={[
                CStyles.text, 
                {fontSize: 15, color: Colors.DARK_TEXT}
                ]}>NAME</Text>
              <View style={APStyles.pointsContainer}>
                <Text style={[CStyles.textDark, Styles.placeAndScoreText]}>
                  PLACE
                </Text>
                <Text style={[CStyles.textDark, Styles.placeAndScoreText]}>
                  SCORE
                </Text>
              </View>
            </View>
            {playerSessions.length > 0 ? 
              playerSessions.map(ps => {
                return (
                  <View key={ps.id} style={[APStyles.container, Styles.container]}>
                    <View style={APStyles.nameCont}>
                      <Text 
                        style={[CStyles.textDark, {fontSize: 30}]}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {player.byId[ps.playerId].name}
                      </Text>
                    </View>
                    <View style={APStyles.pointsContainer}>
                      <Text style={[
                        CStyles.textDark, 
                        Styles.placeAndScoreText,
                        {fontSize: 25}
                      ]}>
                        {sessionModalState.playerSessionIdPlaces
                          .find(psip => psip.playerSessionId === ps.id)?.place}
                      </Text>
                      <Text 
                        style={[
                          CStyles.textDark, 
                          Styles.placeAndScoreText,
                          {fontSize: 25}
                        ]}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {ps.score}
                      </Text>
                    </View>
                </View>
                )
              }): null}
          </View>
          <View style={Styles.bottomButtonsCont}>
            <Control
              onPress={handleReOpen}
              text={'RE-OPEN'}
              pressableStyles={[{ flex: 1}]}
              textStyles={[{fontSize:25}]}
            />
            <Control
              onPress={() => setSessionModalState((state:SessionModalState) => {
                return {...state, vis: false}
              })}
              text={'CANCEL'}
              pressableStyles={[Styles.cancelButton]}
              textStyles={[{fontSize:25, alignContent: 'center'}]}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SessionModal;

const Styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  largeModalChanges: {
    width: '90%',
    maxWidth: Sizes.MAX_MODAL_WIDTH,
    justifyContent: 'space-between',
    backgroundColor: Colors.COLOR3,
    gap: 35,
  },
  container: {
    borderColor: Colors.COLOR1,
    borderWidth: 1,
  },
  titleCont: {
    alignItems: 'center',
    width: '100%',
    padding: 10,
    alignSelf: 'center',
  },
  playerContainer: {
    width: '100%',
    gap: 10,
  },
  headings: {
    borderColor: 'transparent',
    marginBottom: -15,
    marginTop: -30,
  },
  placeAndScoreText: {
    fontSize: 15,
    minWidth: 50,
    textAlign: 'center',
  },
  bottomButtonsCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    gap: 20,
  },
  cancelButton: {
    backgroundColor: Colors.COLOR5,
    flex: 1,
  }
});
