import { FC } from "react";
import { StyleSheet, View, Text, Modal } from "react-native";

import * as Colors from '../styles/Colors';
import Control from "../components/Control";


type NewConfirmModalProps = {
  vis: boolean,
  message: string,
  confirmFunc: any,
  cancelFunc: any,
}

const NewConfirmModal: FC<NewConfirmModalProps> = ({ 
  vis,
  message,
  confirmFunc,
  cancelFunc,
}) => {


  return (

    <Modal
      animationType='fade'
      transparent={true}
      visible={vis}
    >
      <View style={Styles.modal}>
        <View style={Styles.smallModal}>
          <Text style={Styles.message}>{message}</Text>
          <View style={Styles.bottomButtonsCont}>
            <Control
              text={'YES'}
              onPress={confirmFunc}
              pressableStyles={[Styles.confirmButton]}
              textStyles={[{fontSize:30}]}
            />
            <Control
              text={'CANCEL'}
              onPress={cancelFunc}
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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

export default NewConfirmModal;