import { FC } from "react";
import { StyleSheet, Text, View, Pressable, ViewStyle } from "react-native";

import { useSelector, useDispatch } from 'react-redux';

import * as Colors from '../styles/Colors';
import { pressStyle } from "../util/helperFunctions";
import { CommonStyles } from "../styles/CommonStyles";

type OptionalStyles = {
  button?: any,
  text?: any
}

type ControlProps = {
  text?: string;
  action?: any;
  payload?: any;
  optionalStyle?: OptionalStyles;
}

const Control: FC<ControlProps> = ({ text, action, payload, optionalStyle={} }) => {
  const dispatch = useDispatch();

  return (
    <Pressable 
      {...pressStyle(CommonStyles.buttons, optionalStyle.button)}
      onPress={() => dispatch(action())}
    >
      <Text style={[CommonStyles.text, optionalStyle.text]}>{text}</Text>
    </Pressable>
  );
};

export default Control;