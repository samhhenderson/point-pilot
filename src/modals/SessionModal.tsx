import { FC, useState, useEffect } from "react";
import { StyleSheet, Text, View, Modal, ViewStyle } from "react-native";
import { useNavigation } from '@react-navigation/native';

import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from "@reduxjs/toolkit";

import { State, Session, NavigationPropType } from "../types";
import * as Colors from './../styles/Colors';
import * as Sizes from './../styles/Sizes'
import { CStyles } from "../styles/CommonStyles";
import Control from "../components/Control";
import { Styles as APStyles } from "../components/ActivePlayer";
import { useCalculatePlaces } from "../util/helperFunctions";

type SessionModalProps = {
  vis: boolean,
  thisSession: Session,
  setSessionModalVis: (vis: boolean) => void,
}

const SessionModal: FC<SessionModalProps> = ({
  vis, 
  thisSession,
  setSessionModalVis,
}) => {
  const { game, playerSession, player } = useSelector((state: State) => state);
  const calculatePlaces = useCalculatePlaces();
  const navigation = useNavigation<NavigationPropType>();
  const [viewWidth, setViewWidth] = useState(0);
  
  const playerSessionIdPlaces = calculatePlaces(thisSession.id)
  const playerSessionIds = playerSessionIdPlaces.map(psip => psip.playerSessionId);

  const gameName = game.byId[thisSession.gameId].name;
  const date = thisSession.date;
  const title = gameName + ' - ' + date;

  function handleContinue() {
    navigation.navigate('Game')
    navigation.navigate('SessionView', { sessionId: thisSession.id })
    setSessionModalVis(false);
  }

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={vis}
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
            {playerSessionIds.length > 0 ? 
              playerSessionIds.map(id => {
                return (
                  <View key={id} style={[APStyles.container, Styles.container]}>
                    <View style={APStyles.nameCont}>
                      <Text 
                        style={[CStyles.textDark, {fontSize: 30}]}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {player.byId[playerSession.byId[id].playerId].name}
                      </Text>
                    </View>
                    <View style={APStyles.pointsContainer}>
                      <Text style={[
                        CStyles.textDark, 
                        Styles.placeAndScoreText,
                        {fontSize: 25}
                      ]}>
                        {playerSessionIdPlaces
                          .find(psip => psip.playerSessionId === id)?.place}
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
                        {playerSession.byId[id].score}
                      </Text>
                    </View>
                </View>
                )
              }): null}
          </View>
          <View style={Styles.bottomButtonsCont}>
            <Control
              onPress={handleContinue}
              text={'OPEN SESSION'}
              pressableStyles={[{backgroundColor: Colors.COLOR1, flex: 1}]}
              textStyles={[{fontSize:25}]}
            />
            <Control
              onPress={() => setSessionModalVis(false)}
              text={'X'}
              pressableStyles={[{backgroundColor: Colors.COLOR5}]}
              textStyles={[{fontSize:40, alignContent: 'center'}]}
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
});
