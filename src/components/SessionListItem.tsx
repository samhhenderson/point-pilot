import { FC, useRef, useState } from "react";
import { StyleSheet, Text, View, Pressable, LayoutChangeEvent } from "react-native";

import { useSelector, useDispatch } from 'react-redux';
import { setConfirmModal } from "../redux/modalsSlice";

import * as Colors from '../styles/Colors';
import * as Sizes from '../styles/Sizes';
import { CommonStyles } from "../styles/CommonStyles";
import Control from "./Control";
import { State } from "../types";
import AsyncConfirmModal from "../modals/AsyncConfirmModal";


type SessionListItemProps = {
  id: number,
}

const SessionListItem: FC<SessionListItemProps> = ({ id }) => {
  const dispatch = useDispatch();
  const thisSession = useSelector((state: State) => state.session.byId[id])
  const { game, playerSession } = useSelector((state: State) => state);

  const [ modalVis, setModalVis ] = useState(false);

  const gameName = game.byId[thisSession.gameId].name;
  const date = thisSession.date;
  const sessionName = `${gameName} - ${date}`;

  function handlePressSessionItem() {

  }

  function handleDeleteSessionItem() {
    // dispatch(setConfirmModal({
    //   message: `Remove this session from session list?`,
    //   confirmFunc: 'deletesession',
    //   confirmArgs: [id],
    // }))

    

  }

  return (
    <View style={Styles.container}>
      <Control
        onPress={handlePressSessionItem}
        text={sessionName}
        pressableStyles={[Styles.sessionNameButton]}
        textStyles={[{fontSize:30}]}
      />
      <Control
        onPress={handleDeleteSessionItem}
        text={'X'}
        pressableStyles={[Styles.deleteButton]}
        textStyles={[{fontSize:20}]}
      />
      <AsyncConfirmModal
        vis={modalVis}
        message={`Remove ${sessionName} from session list?`}

      />
    </View>
  );
}

export const Styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  sessionNameButton: {
    flexGrow: 1,
    backgroundColor: Colors.COLOR2,
    borderRadius: 10,
    height: Sizes.smallButtons,
  },
  deleteButton: {
    backgroundColor: Colors.COLOR5,
    height: Sizes.smallButtons - 10,
    width: Sizes.smallButtons - 10,
    borderRadius: 10,
  }
})

export default SessionListItem;