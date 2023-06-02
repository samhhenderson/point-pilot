import { FC } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

import { useSelector, useDispatch } from 'react-redux';

import * as Colors from '../styles/Colors'
import { hideNumberModal } from "../redux/viewSlice";

type NumberProps = {
  text: string;
  setNumDisplay: any;
  numDisplay: string;
}

const NumberButton: FC<NumberProps> = ({ text, setNumDisplay, numDisplay }) => {
  const dispatch = useDispatch();

  function modifyNumDisplay(num:string):void {
    switch(num) {
      case '-':
        break;
      case 'X':
        break;
      default:
        setNumDisplay(numDisplay.concat(num))
    }

  }

  return (
    <Pressable style={Styles.buttons} onPress={() => modifyNumDisplay(text)}>
      <Text style={Styles.text}>{text}</Text>
    </Pressable>
  );
};

const Styles = StyleSheet.create({

  buttons: {
    backgroundColor: Colors.COLOR4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: 70,
    height: 70,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  text: {
    color: 'white',
    fontSize: 30
  }
});

export default NumberButton;