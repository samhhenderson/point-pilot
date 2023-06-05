import * as Colors from './Colors';
import * as Sizes from './Sizes';
import { StyleSheet } from "react-native";

export const CommonStyles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.COLOR1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    backgroundColor: Colors.COLOR4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: Sizes.medButtons,
    height: Sizes.medButtons,
    borderRadius: 10,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  text: {
    color: 'white'
  }
});