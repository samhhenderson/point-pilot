import * as Colors from './Colors';
import * as Sizes from './Sizes';
import { StyleSheet } from "react-native";

export const CommonStyles = StyleSheet.create({
  
  largeModal: {
    flex: 1,
    backgroundColor: Colors.COLOR2,
    justifyContent: 'center',
    alignContent: 'center',
    maxWidth: 330,
    maxHeight: 600,
    borderRadius: 20,
    padding: 30,
    gap: 10,
  },

  text: {
    color: 'white'
  }
});