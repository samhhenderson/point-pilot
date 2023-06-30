
// Import React and React Native modules
import { FC, useState, useMemo } from "react";
import { StyleSheet, Text, View, ScrollView, FlatList} from "react-native";

// Import Redux modules
import { useSelector, useDispatch } from 'react-redux';

// Import other modules
import { State, NavigationPropType, SessionModalState } from "../types";
import * as Colors from './../styles/Colors';
import { CStyles } from "../styles/CommonStyles";
import SessionListItem from "../components/SessionListItem";
import NewConfirmModal from "../modals/NewConfirmModal";
import SessionModal from "../modals/SessionModal";

type HistoryProps = {
  navigation: NavigationPropType,
}
const History: FC<HistoryProps> = function ({navigation}) {

  console.log('HISTORY 20')
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
      <Text style={[CStyles.text, CStyles.title]}>
        HISTORY
      </Text>
      <FlatList
        data={sortedSessionIds}
        renderItem={({item}) => (
          <SessionListItem
            sessionId={item}
            setConfirmModalState={setConfirmModalState}
            setSessionModalState={setSessionModalState}
          />
        )}
        keyExtractor={(item: number) => item.toString()}
        contentContainerStyle={Styles.gameListContainer}
      />
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
  game: {
    flexGrow: 1,
    backgroundColor: Colors.COLOR1,
  },
  title: {
    fontSize: 40,
    textAlign: 'center',
    marginTop: 20,
  },
  gameListContainer: {
    width: '100%',
    padding: 10,
    gap: 15,
    maxWidth: 500,
  },
  addButton: {
    borderRadius: 35,
    backgroundColor: 'green',
  }

});