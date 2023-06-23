// Import React and React Native modules
import { FC, useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { NavigationPropType } from "../types";

// Import Redux modules
import { useDispatch } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { getGames } from "../redux/gameSlice";
import { getPlayers } from "../redux/playerSlice";
import { getSessions } from "../redux/sessionSlice";
import { getPlayerSessions } from "../redux/playerSessionSlice";
import { getSettings } from "../redux/settingSlice";

// Import other modules
import { State } from "../types";
import * as Colors from '../styles/Colors';
import CheckBox from "../components/CheckBox";
import { useSelector } from "react-redux";
import { updateSetting } from "../redux/settingSlice";
import { CommonStyles } from "../styles/CommonStyles";
import Control from "../components/Control";
import NewConfirmModal from "../modals/NewConfirmModal";
import { executeSqlAsync } from "../db/db-service";

type SettingsProps = {
  navigation: NavigationPropType,
}

const SettingsView: FC<SettingsProps> = ({navigation}) => {
  const settings = useSelector((state: State) => state.setting.byId);
  const dispatchThunk:ThunkDispatch<State, null, any> = useDispatch();

  const [ confirmModalvis, setConfirmModalvis ] = useState<boolean>(false);

  // function handleConfirmReset() {
  //   async function dropTables() {
  //     try {
  //       await executeSqlAsync('PRAGMA foreign_keys = OFF;')
  //       await executeSqlAsync('DELETE FROM players;')
  //       await executeSqlAsync('DELETE FROM games;')
  //       await executeSqlAsync('DELETE FROM sessions;')
  //       await executeSqlAsync('DELETE FROM playerSessions;')
  //       await executeSqlAsync('DELETE FROM settings;')
  //       await executeSqlAsync('PRAGMA foreign_keys = ON;')
  //       console.log('TABLES CLEARED')
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }
  //   dropTables();
  //   const insertSettings =
  //   'INSERT OR IGNORE INTO settings (id, name, value) VALUES (?, ?, ?)'

  //   for (const name in settings) {
  //     executeSqlAsync(insertSettings, [
  //       settings[name].id, 
  //       settings[name].name, 
  //       settings[name].value
  //     ])
  //   }
  //   dispatchThunk(getPlayers());
  //   dispatchThunk(getGames());
  //   dispatchThunk(getSessions());
  //   dispatchThunk(getPlayerSessions());
  //   dispatchThunk(getSettings());
  //   setConfirmModalvis(false);
  // }

  return (
    <View style={Styles.app}>
      <View style={Styles.settingCont}>
        <Text style={[CommonStyles.text, CommonStyles.title]}>SETTINGS</Text>
        <View style={Styles.settingItem}>
          <CheckBox
            value={!!settings['resetBid'].value}
            styles={[Styles.checkboxStyle]}
            color={Colors.COLOR2}
            onValueChange={() => {
              dispatchThunk(updateSetting({
                id: settings['resetBid'].id, 
                name: 'resetBid', 
                value: !!settings['resetBid'].value ? 0 : 1,
              }));
            }}
          />
          <Text style={[CommonStyles.text, Styles.settingText]}>
            Reset bid after changing score
          </Text>
        </View>
        {/* <View style={Styles.settingItem}>
          <Control
            onPress={() => setConfirmModalvis(true)}
          />
          <Text style={[CommonStyles.text, Styles.settingText]}>
            Reset all data
          </Text>
        </View> */}
      </View>
      {/* <NewConfirmModal
        vis={confirmModalvis}
        message={'Are you sure you want to reset all data? This cannot be undone.'}
        confirmFunc={handleConfirmReset}
        cancelFunc={() => setConfirmModalvis(false)}
      /> */}
    </View>
  );
};

export default SettingsView;

const Styles = StyleSheet.create({
  app: {
    backgroundColor: Colors.COLOR1,
    flex: 1,
  },
  settingCont: {
    flex: 1,
  },
  settingItem: {
    flexDirection: 'row',
    padding: 10,
    gap: 10,
    alignItems: 'center',
  },
  settingText: {
    fontSize: 20,
  },
  checkboxStyle: {
  },

});