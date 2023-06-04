import { FC, useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

import { useSelector, useDispatch } from 'react-redux';
import { hideNumberModal } from "../redux/viewSlice";

import * as Colors from '../styles/Colors';
import * as Sizes from '../styles/Sizes';
import { pressStyle } from "../util/helperFunctions";
import { CommonStyles } from "../styles/CommonStyles";

type NumberProps = {
  text: string;
  setNumDisplay: any;
  numDisplay: string;
}

const NumberButton: FC<NumberProps> = ({ text, setNumDisplay, numDisplay }) => {
  const [buttonText, setButtonText] = useState(text)
  
  const dispatch = useDispatch();

  function modifyNumDisplay(num:string):void {
    switch(num) {
      case '-':
        setButtonText('+')
        break;
      case '+':
        setButtonText('-')
        break;
      case 'X':
        break;
      default:
        setNumDisplay(numDisplay.concat(num))
    }

  }

  return (
    <Pressable 
      {...pressStyle(CommonStyles.buttons, Styles.buttons)}
      onPress={() => modifyNumDisplay(buttonText)}
    >
      <Text style={Styles.text}>{text}</Text>
    </Pressable>
  );
};

const Styles = StyleSheet.create({

  buttons: {
    backgroundColor: Colors.COLOR4,
    width: Sizes.medButtons,
    height: Sizes.medButtons,

  },
  text: {
    color: 'white',
    fontSize: 30
  }
});

export default NumberButton;