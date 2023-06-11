import { FC, useState } from "react";
import { StyleSheet, View, Text, Modal } from "react-native";
import Checkbox from "expo-checkbox";

import { useSelector, useDispatch } from "react-redux";
import { deleteGame } from "../views/gameSlice";
import { deletePlayer } from "../views/playerSlice";

import { State } from "../types";
import * as Colors from '../styles/Colors';
import * as Sizes from '../styles/Sizes';
import Control from "../components/Control";
import { hideConfirmModal } from "./modalsSlice";

type ConfirmModalProps = {

}

const ConfirmModal: FC<ConfirmModalProps> = () => {

  const dispatch = useDispatch();

  const { 
    vis, 
    message,
    confirmFunc,
    confirmArgs,
   } = useSelector((state:State) => state.modals.confirm)

  function handleConfirm() {
    switch(confirmFunc) {
      case 'deleteGame':
        dispatch(deleteGame(confirmArgs[0]));
        break;
      case 'deletePlayer':
        dispatch(deletePlayer(confirmArgs[0]))
        break;
      default:
        console.log('NO FUNCTION FOUND')
    }
    dispatch(hideConfirmModal())
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
              onPress={() => dispatch(hideConfirmModal())}
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

export default ConfirmModal;