
// Import React and React Native modules
import { FC, useState, useMemo } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

// Import Redux modules
import { useSelector } from 'react-redux';

// Import other modules
import { State, NavigationPropType, SessionModalState } from "../types";
import * as Colors from './../styles/Colors';
import * as Sizes from '../styles/Sizes';
import { CStyles } from "../styles/CommonStyles";
import SessionListItem from "../components/SessionListItem";
import NewConfirmModal from "../modals/NewConfirmModal";
import SessionModal from "../modals/SessionModal";

type HistoryProps = {
  navigation: NavigationPropType,
}
const History: FC<HistoryProps> = function ({navigation}) {

  // REDUX / STATE HOOKS
  const session = useSelector((state:State) => state.session);

  const [confirmModalState, setConfirmModalState] = useState({
    vis: false,
    message: '',
    confirmFunc: () => {},
    cancelFunc: () => {},
  });

  const [sessionModalState, setSessionModalState] = useState<SessionModalState>({
    vis: false,
    thisSession: null,
    playerSessionIdPlaces: [],
  });
  
  const sortedSessionIds = useMemo(() => {
    const sessionAllIdsCopy = [...session.allIds];
    return sessionAllIdsCopy.sort((a, b) => {
      const aDate = new Date(session.byId[a].date);
      const bDate = new Date(session.byId[b].date);
      return bDate.getTime() - aDate.getTime();
    });
  }
  , [session]);

  return (

    <View style={Styles.app}>

      <ScrollView contentContainerStyle={Styles.history}>
        <Text style={[CStyles.text, CStyles.title]}>HISTORY</Text>
        <View style={Styles.gameListContainer}>
          {sortedSessionIds.map((id) => {
            return (
              <SessionListItem
                key={id}
                sessionId={id}
                setConfirmModalState={setConfirmModalState}
                setSessionModalState={setSessionModalState}
              />
            );
          }
          )}
        </View>
      </ScrollView>

      <NewConfirmModal
        vis={confirmModalState.vis}
        message={confirmModalState.message}
        confirmFunc={confirmModalState.confirmFunc}
        cancelFunc={confirmModalState.cancelFunc}
      />
      <SessionModal
        sessionModalState={sessionModalState}
        setSessionModalState={setSessionModalState}
      />
    </View>
  );
};

export default History;

const Styles = StyleSheet.create({
  app: {
    backgroundColor: Colors.COLOR1,
    flex: 1,
  },
  history: {
    flexGrow: 1,
    backgroundColor: Colors.COLOR1,
    paddingBottom: Sizes.TAB_BAR_HEIGHT,
    alignItems: 'center',
  },
  gameListContainer: {
    width: '100%',
    padding: 10,
    gap: 15,
    maxWidth: 450,
  },
  addButton: {
    borderRadius: 35,
    backgroundColor: 'green',
  }

});