import { useFonts } from 'expo-font';

import * as Colors from './Colors';
import * as Sizes from './Sizes';
import { StyleSheet } from "react-native";

// const [fontsLoaded] = useFonts({
//   'Roboto': require('../../assets/fonts/Roboto-Regular.ttf'),
// });

const maxHeight = Math.min(Sizes.SCREEN_HEIGHT * 0.9, 750);

export const CStyles = StyleSheet.create({
  
  largeModal: {
    backgroundColor: Colors.COLOR6,
    justifyContent: 'center',
    alignContent: 'center',
    maxWidth: Sizes.SCREEN_WIDTH * 0.90,
    width: 500,
    maxHeight: maxHeight,
    borderRadius: Sizes.LARGE_BORDER_RADIUS,
    padding: 20,
    gap: 10,
  },

  smallModal: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.COLOR6,
    justifyContent: 'space-between',
    alignContent: 'center',
    maxWidth: 330,
    minWidth: 300,
    maxHeight: 300,
    borderRadius: Sizes.LARGE_BORDER_RADIUS,
    padding: 30,
    gap: 10,
  },
  modalCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  text: {
    color: 'rgb(255	255	255	)',
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
    marginTop: Sizes.STATUS_BAR_HEIGHT + Sizes.SCREEN_HEIGHT * 0.01,
  },
});