import { FC, useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable, Modal, ViewStyle } from "react-native";

import { useSelector, useDispatch } from 'react-redux';
import { hideNumberModal } from "./modalsSlice";
import { changeScore } from "../components/playerDisplaySlice";

import { State } from "../types";
import * as Colors from './../styles/Colors';
import * as Sizes from './../styles/Sizes'
import { pressStyle } from "../util/helperFunctions";
import { CommonStyles } from "../styles/CommonStyles";

const newGameModal: FC = () => {
  const { 
    gameName, 
    useBid, 
    lowScoreWins, 
    teams 
  } = useSelector((state: State) => state.game.gameDisplay);
  const { vis } = useSelector((state: State) => state.modals.newGame);

  const dispatch = useDispatch();

  const allPlayersRender:  JSX.Element[] = [];

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={vis}
    >
      <View style={Styles.modal}>
        <View style={Styles.container}>
          <View style={Styles.display}>
            <Text style={Styles.text}>{posOrNegSign}</Text>
            <Text style={Styles.text} numberOfLines={1}>{numDisplay}</Text>
          </View>
          {numberButtons}
        <Pressable
          {...pressStyle(CommonStyles.buttons, Styles.okButton)}
          onPress={acceptScore}
        >
          <Text style={[CommonStyles.text, {fontSize: 40}]}>OK</Text>
        </Pressable>
        <Pressable
          {...pressStyle(CommonStyles.buttons, Styles.cancelButton)}
          onPress={() => dispatch(hideNumberModal())}
        >
          <Text style={[CommonStyles.text, {fontSize: 40}]}>X</Text>
        </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default newGameModal;

const Styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: Colors.COLOR2,
    justifyContent: 'center',
    alignContent: 'center',
    maxWidth: 330,
    maxHeight: 600,
    marginTop: 50,
    borderRadius: 20,
    padding: 30,
    gap: 10,

  },
  display: {
    minWidth: 200,
    height: 70,
    borderRadius: 20,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.DARK,
    color: 'white',
    fontSize: 40,
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 10,
  }, 
  text: {
    color: 'white',
    fontSize: 40,
  },
  minusBackButtons: {
    backgroundColor: Colors.COLOR1,
  },
  okButton: {
    width: 150,
    backgroundColor: Colors.COLOR1,
    marginTop: 10
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: Colors.COLOR5,
  }
});

const okButtonStyles = StyleSheet.create({
  okButton: {
    width: 150,
    backgroundColor: Colors.COLOR1,
    marginTop: 10
  },
  text: {
    fontSize: 30
  }
})

const cancelButtonStyles = StyleSheet.create({
  button: {
    width: Sizes.medButtons,
    height: Sizes.medButtons,
    marginTop: 10,
  },
  text: {
    fontSize: 15
  }
})