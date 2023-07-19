import { useFonts } from 'expo-font';

import * as Colors from './Colors';
import * as Sizes from './Sizes';
import { StyleSheet } from "react-native";

// const [fontsLoaded] = useFonts({
//   'Roboto': require('../../assets/fonts/Roboto-Regular.ttf'),
// });

export const CStyles = StyleSheet.create({
  
  largeModal: {
    backgroundColor: Colors.COLOR6,
    justifyContent: 'center',
    alignContent: 'center',
    maxWidth: 400,
    marginTop: 30,
    margin: 10,
    borderRadius: Sizes.LARGE_BORDER_RADIUS,
    padding: 20,
    gap: 10,
    // borderWidth: 1,
    // borderColor: Colors.COLOR3,
  },

  smallModal: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.COLOR3,
    justifyContent: 'space-between',
    alignContent: 'center',
    maxWidth: 330,
    maxHeight: 300,
    borderRadius: Sizes.MED_BORDER_RADIUS,
    padding: 30,
    gap: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'System',
  },
  textDark: {
    color: Colors.DARK_TEXT,
    fontSize: 20,
  },
  title: {
    fontSize: 40,
    textAlign: 'center',
    marginTop: 40,
  },
});