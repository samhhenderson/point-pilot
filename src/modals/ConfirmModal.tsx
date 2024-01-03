// REACT NATIVE IMPORTS
import { FC,} from "react";
import { StyleSheet, View, Text, Modal } from "react-native";

// REDUX IMPORTS
import { useSelector, useDispatch } from "react-redux";
import { deleteGame } from "../redux/gameSlice";
import { deletePlayer } from "../redux/playerSlice";
import { deleteTempPlayerSession } from "../redux/playerSessionSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";

// OTHER IMPORTS
import { State, NavigationPropType } from "../types";
import * as Colors from '../styles/Colors';
import { CStyles } from "../styles/CommonStyles";
import Control from "../components/Control";
import { hideConfirmModal } from "../redux/modalsSlice";
import { updateSession } from "../redux/sessionSlice";

type ConfirmModalProps = {
  navigation: NavigationPropType,
}

const ConfirmModal: FC<ConfirmModalProps> = ({ navigation }) => {

  // REDUX HOOKS
  const dispatch = useDispatch();
  const dispatchThunk:ThunkDispatch<State, null, any> = useDispatch();
  const { 
    vis, 
    message,
    confirmFunc,
    confirmArgs,
  } = useSelector((state:State) => state.modals.confirm)

  // We can't store functions in redux, so we have to do this
  function handleConfirm() {
    switch(confirmFunc) {
      case 'deleteGame':
        if (confirmArgs) dispatchThunk(deleteGame(confirmArgs[0]));
        break;
      case 'deletePlayer':
        if (confirmArgs) {
          dispatchThunk(deletePlayer(confirmArgs[0]));
          dispatch(deleteTempPlayerSession(confirmArgs[0]));
        }
        break;
      case 'endSession':
        if (confirmArgs) dispatchThunk(updateSession(confirmArgs[0]));
        navigation.navigate('Home');
        break;
      case 'confirmAsyncOperation':
        if (confirmArgs) confirmArgs[0](true);
      default:
        console.log('NO FUNCTION FOUND')
    }
    dispatch(hideConfirmModal())
  }

  function handleCancel() {
    dispatch(hideConfirmModal())
  }

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

export default ConfirmModal;