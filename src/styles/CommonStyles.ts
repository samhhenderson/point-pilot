import * as Colors from './Colors';
import * as Sizes from './Sizes';
import { StyleSheet } from "react-native";

export const CommonStyles = StyleSheet.create({
  
  largeModal: {
    flex: 1,
    backgroundColor: Colors.COLOR2,
    justifyContent: 'center',
    alignContent: 'center',
    maxWidth: 400,
    marginTop: 30,
    margin: 10,
    borderRadius: 20,
    padding: 20,
    gap: 10,
  },

  text: {
    color: 'white',
    fontSize: 20,
  },
  title: {
    fontSize: 40,
    textAlign: 'center',
    marginTop: 20,
  },
});