
// Import React and React Native modules
import { FC, useState, useMemo } from "react";
import { StyleSheet, Text, View, ScrollView, FlatList} from "react-native";

// Import Redux modules
import { useSelector, useDispatch } from 'react-redux';

// Import other modules
import { State, NavigationPropType, } from "../types";
import * as Colors from './../styles/Colors';
import { CStyles } from "../styles/CommonStyles";
import SessionListItem from "../components/SessionListItem";

type HistoryProps = {
  navigation: NavigationPropType,
}
const History: FC<HistoryProps> = function ({navigation}) {

  console.log('HISTORY 20')

  const session = useSelector((state:State) => state.session);
  
//   const sortedSessionIds = useMemo(()=> {   
//     return session.allIds.sort((a, b) => {
//       const aDate = new Date(session.byId[a].date);
//       const bDate = new Date(session.byId[b].date);
//       return bDate.getTime() - aDate.getTime();
//   });
// }, [session]);
console.log('HISTORY 31', session.allIds)
const sortedSessionIds = session.allIds.sort((a, b) => {
    const aDate = new Date(session.byId[a].date);
    const bDate = new Date(session.byId[b].date);
    return bDate.getTime() - aDate.getTime();
});


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
          />
        )}
        keyExtractor={(item: number) => item.toString()}
        contentContainerStyle={Styles.gameListContainer}
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