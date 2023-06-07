import { FC, useState, useEffect } from "react";
import { StyleSheet, Text, View, Modal, TextInput } from "react-native";
import Checkbox from 'expo-checkbox';

import { useSelector, useDispatch } from 'react-redux';
import { hideNewGameModa, hideNumberModal } from "./modalsSlice";
import { changeGameDisplay } from "../views/gameSlice";

import { State } from "../types";
import * as Colors from '../styles/Colors';
import * as Sizes from '../styles/Sizes'
import { CommonStyles } from "../styles/CommonStyles";
import Control from "../components/Control";

const NewGameModal: FC = () => {
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
        <View style={[CommonStyles.largeModal, Styles.largeModalChanges]}>
          <View style={Styles.header}>
            <Text style={[CommonStyles.text, {fontSize: 40}]}>GAME:</Text>
            <TextInput 
              style={Styles.textInput}
              onChangeText={text => dispatch(changeGameDisplay({gameName: text}))}
              value={gameName}
            />
          </View>
          <View style={Styles.gameOption}>
            <Checkbox 
              style={Styles.checkbox} 
              color={Colors.CHECKBOX}
              value={lowScoreWins}
            />
            <Text style={CommonStyles.text}>LOW SCORE WINS</Text>
          </View>
          <View style={Styles.gameOption}>
            <Checkbox 
              style={Styles.checkbox} 
              color={Colors.CHECKBOX}
              value={useBid}
            />
            <Text style={CommonStyles.text}>BIDS</Text>
          </View>
          <TextInput
            placeholder="Enter Numeric Values Only"
            placeholderTextColor="#60605e"
            inputMode={'numeric'}
          ></TextInput>
          <Control
            onPress={() => dispatch(hideNewGameModa())}
            text={'X'}
            textStyles={[{fontSize:40}]}
          />
        </View>
      </View>
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
    fontSize: 40,
    backgroundColor: Colors.COLOR3,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 2,
    borderColor: 'black',
    borderWidth: 1,
  },
  checkbox: {
    width: Sizes.smallButtons, 
    height: Sizes.smallButtons, 
    borderRadius: 10
  },
  gameOption: {
    flexDirection: 'row',
    gap: 15,
    margin: 10,
  }
});
