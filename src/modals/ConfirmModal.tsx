import { FC } from "react";
import { StyleSheet, View, Text, Modal } from "react-native";
import Checkbox from "expo-checkbox";

import { useSelector, useDispatch } from "react-redux";

import { State } from "../types";
import * as Colors from '../styles/Colors';
import * as Sizes from '../styles/Sizes';
import Control from "../components/Control";
import { hideConfirmModal } from "./modalsSlice";

type ConfirmModalProps = {
  onConfirm: any,
}

const ConfirmModal: FC<ConfirmModalProps> = ({ onConfirm }) => {
  const dispatch = useDispatch();

  const { vis, message } = useSelector((state:State) => state.modals.confirm)

  function handleConfirm() {
    onConfirm();
    dispatch(hideConfirmModal());
  }

  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={vis}
    >
      <View style={Styles.modal}>
        <View style={Styles.smallModal}>
          <Text>{message}</Text>
          <Control
            text={'YES'}
            onPress={handleConfirm}
            pressableStyles={[Styles.confirmButton]}
            textStyles={[{fontSize:40}]}
          />
          <Control
            text={'CANCEL'}
            onPress={() => dispatch(hideConfirmModal())}
            pressableStyles={[Styles.cancelButton]}
            textStyles={[{fontSize:40}]}
          />
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
    backgroundColor: Colors.COLOR2,
    justifyContent: 'center',
    alignContent: 'center',
    maxWidth: 330,
    maxHeight: 600,
    borderRadius: 20,
    padding: 30,
    gap: 10,
  },
  confirmButton: {
    width: 150,
  },
  cancelButton: {
    backgroundColor: Colors.COLOR2,
  }
})

export default ConfirmModal;