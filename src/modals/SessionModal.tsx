import { FC, useState, useEffect } from "react";
import { StyleSheet, Text, View, Modal, ViewStyle } from "react-native";
import { useNavigation } from '@react-navigation/native';

import { useSelector, useDispatch } from 'react-redux';
import { ThunkDispatch } from "@reduxjs/toolkit";

import { State, Session, NavigationPropType } from "../types";
import * as Colors from './../styles/Colors';
import * as Sizes from './../styles/Sizes'
import { CommonStyles } from "../styles/CommonStyles";
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
  const playerSessionIdPlaces = useCalculatePlaces(thisSession.id)
  const navigation = useNavigation<NavigationPropType>();
  const [viewWidth, setViewWidth] = useState(0);

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
          style={[CommonStyles.largeModal, Styles.largeModalChanges]}
          onLayout={(event) => {
            setViewWidth(event.nativeEvent.layout.width)}}
        > 
          <View style={Styles.titleCont}>
            <Text style={[CommonStyles.text, {fontSize: 40}]}>{title}</Text>
          </View>
          <View style={Styles.playerContainer}>
            <View style={[APStyles.container, Styles.headings]} >
              <Text style={[CommonStyles.text, {fontSize: 15}]}>NAME</Text>
              <View style={APStyles.pointsContainer}>
                <Text style={[CommonStyles.text, Styles.placeAndScoreText]}>
                  PLACE
                </Text>
                <Text style={[CommonStyles.text, Styles.placeAndScoreText]}>
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
                        style={[CommonStyles.text, {fontSize: 30}]}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {player.byId[playerSession.byId[id].playerId].name}
                      </Text>
                    </View>
                    <View style={APStyles.pointsContainer}>
                      <Text style={[
                        CommonStyles.text, 
                        Styles.placeAndScoreText,
                        {fontSize: 25}
                      ]}>
                        {playerSessionIdPlaces
                          .find(psip => psip.playerSessionId === id)?.place}
                      </Text>
                      <Text 
                        style={[
                          CommonStyles.text, 
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
              text={'CONTINUE SESSION'}
              pressableStyles={[Styles.continueButton]}
              textStyles={[{fontSize:30}]}
            />
            <Control
              onPress={() => setSessionModalVis(false)}
              text={'X'}
              pressableStyles={[Styles.cancelButton]}
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
  },
  container: {
    borderColor: Colors.COLOR3,
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
    marginTop: -15,
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
  },
  continueButton: {
    width: 170,
    backgroundColor: Colors.COLOR1,
    height: 100,
    marginTop: 10,
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: Colors.COLOR5,
  }
});
