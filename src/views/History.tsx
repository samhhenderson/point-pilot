
// Import React and React Native modules
import { FC, useState } from "react";
import { StyleSheet, Text, View, ScrollView} from "react-native";

// Import Redux modules
import { useSelector, useDispatch } from 'react-redux';

// Import other modules
import { State, NavigationPropType, } from "../types";
import * as Colors from './../styles/Colors';
import { CommonStyles } from "../styles/CommonStyles";
import SessionListItem from "../components/SessionListItem";
import Control from "../components/Control";
import ConfirmModal from "../modals/ConfirmModal";



type HistoryProps = {
  navigation: NavigationPropType,
}

const History: FC<HistoryProps> = ({navigation}) => {
  const dispatch = useDispatch();
  const { session, playerSession } = useSelector((state:State) => state);
  

  return (
    <View style={Styles.app}>
    <ScrollView contentContainerStyle={Styles.game}>
      <Text style={[CommonStyles.text, Styles.title]}>Games</Text>
      <View style={Styles.gameListContainer}>
        {session.allIds.map((id) => (
          <SessionListItem
            key={id}
            id={id}
          />
        ))}
      </View>
    </ScrollView>
    <ConfirmModal
      navigation={navigation}
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
    fontSize: 50,
    textAlign: 'center',
    marginTop: 30,
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