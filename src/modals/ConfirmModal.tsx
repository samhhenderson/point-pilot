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
    alignContents: 'center',
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