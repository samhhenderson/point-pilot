// Purpose: Main entry point for the app. Contains the navigation stack and redux provider.
// Import React and React Native modules
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


// Import Redux modules
import { Provider, useSelector} from 'react-redux';
import store from './src/redux/store';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, } from 'react-redux';


// Import other modules
import { State } from './src/types';
import History from './src/views/History';
import Game from './src/views/Game';
import Settings from './src/views/SettingsView';
import { useCreateDatabase } from './src/util/databaseResetHooks';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import * as Colors from './src/styles/Colors';
import * as Sizes from './src/styles/Sizes';

type RootStackParamList = {
  Game: undefined,
  History: undefined,
  Settings: undefined,
}

const Tab = createBottomTabNavigator<RootStackParamList>();

function App() {
  const dispatchThunk:ThunkDispatch<State, null, any> = useDispatch();
  const settings = useSelector((state:State) => state.setting.byId)
  const createDatabase = useCreateDatabase()

  useEffect(() => {
    createDatabase()
  }, [])


  return (
    <>
      <StatusBar 
        style='light'
      />
      <NavigationContainer>
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: string = '';
            if (route.name === 'Game') {
              return focused 
              ? <MaterialCommunityIcons 
                name={'cards-playing'} 
                size={size} 
                color={color} 
              />
              : <MaterialCommunityIcons 
                name={'cards-playing-outline'} 
                size={size} 
                color={color} 
              />;
            } else if (route.name === 'History') {
              return <MaterialCommunityIcons 
                name={'history'} 
                size={size} 
                color={color} 
              />;
            } else if (route.name === 'Settings') {
              return <Ionicons name={'settings'} size={size} color={color} />;
            }

          },
          tabBarStyle: {
            backgroundColor: Colors.DARK,
            borderTopWidth: 0,
            elevation: 0,
            position: 'absolute',
            height: Sizes.TAB_BAR_HEIGHT,
          },
          headerShown: false,
          tabBarActiveTintColor: Colors.COLOR2,
          tabBarInactiveTintColor: Colors.COLOR3,
          tabBarShowLabel: false,
        })}

        >
          <Tab.Screen 
            name='Game' 
            component={Game} 
          />
          <Tab.Screen 
            name='History' 
            component={History} 
          />
          <Tab.Screen 
            name='Settings' 
            component={Settings} 
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

export default function AppWithProvider() {
  return (
    <Provider store={store}>
      <View
        style={Styles.statusBar}
      />
      <App />
    </Provider>
  )
}

const Styles = StyleSheet.create({
  statusBar: {
    backgroundColor: Colors.DARK,
    position: 'absolute',
    height: Sizes.STATUS_BAR_HEIGHT,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  }
})
