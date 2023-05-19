import { FC } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

import { useSelector, useDispatch } from 'react-redux';

import * as Colors from './../styles/Colors'
import { ButtonStyles } from "../styles/CommonStyles";

type ControlProps = {
  text?: string;
  action?: any;
  payload?: any;
}

const Control: FC<ControlProps> = ({ text, action }) => {
  const dispatch = useDispatch();

  return (
    <Pressable 
      style={ButtonStyles.buttons} 
      onPress={() => dispatch(action())}
    >
      <Text style={ButtonStyles.text}>{text}</Text>
    </Pressable>
  );
};

export default Control;