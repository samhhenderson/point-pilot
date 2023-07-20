import { FC } from "react";
import { StyleSheet, View, Text, Modal } from "react-native";

import * as Colors from '../styles/Colors';
import Control from "../components/Control";
import { CStyles } from "../styles/CommonStyles";


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
      <View style={CStyles.modalCont}>
        <View style={CStyles.smallModal}>
          <Text style={[CStyles.text, Styles.message]}>{message}</Text>
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

  message: {
    fontSize: 30,
    textAlign: 'center',
  },
  bottomButtonsCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  cancelButton: {
    backgroundColor: Colors.COLOR5,
    minWidth: 140,
  },
  confirmButton: {
    flex: 1,
  },
})

export default NewConfirmModal;