import { FC, useState } from "react";
import { StyleSheet, View, Text, Modal } from "react-native";
import Checkbox from "expo-checkbox";

import { useSelector, useDispatch } from "react-redux";
import { deleteGame, updateGame } from "../redux/gameSlice";
import { deletePlayer } from "../redux/playerSlice";
import { hideNewGameModal } from "../redux/modalsSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";

import { State, NavigationPropType } from "../types";
import * as Colors from '../styles/Colors';
import * as Sizes from '../styles/Sizes';
import Control from "../components/Control";
import { db } from "../db/db-service";
import { updateSession } from "../redux/sessionSlice";

type AsyncConfirmModalProps = {
  vis: boolean,
  message: string,
  confirmFunc: any,
  cancleFunc: any,
}

const AsyncConfirmModal: FC<AsyncConfirmModalProps> = ({ 
  vis,
  message,
  confirmFunc,
  cancleFunc,
}) => {

  function handleConfirm() {

  }

  function handleCancel() {

  }

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={vis}
    >
      <View style={Styles.modal}>
        <View style={Styles.smallModal}>
          <Text style={Styles.message}>{message}</Text>
          <View style={Styles.bottomButtonsCont}>
            <Control
              text={'YES'}
              onPress={handleConfirm}
              pressableStyles={[Styles.confirmButton]}
              textStyles={[{fontSize:30}]}
            />
            <Control
              text={'CANCEL'}
              onPress={handleCancel}
              pressableStyles={[Styles.cancelButton]}
              textStyles={[{fontSize:30}]}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export const Styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallModal: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.COLOR3,
    justifyContent: 'space-between',
    alignContent: 'center',
    maxWidth: 330,
    maxHeight: 300,
    borderRadius: 20,
    padding: 30,
    gap: 10,
  },
  message: {
    fontSize: 30,
    alignContent: 'center',
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
  confirmButton: {
    flex: 1,
  },
})

export default AsyncConfirmModal;