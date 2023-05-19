import { FC } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

import { useSelector, useDispatch } from 'react-redux';

import * as Colors from '../styles/Colors'
import { hideNumberModal } from "../redux/viewSlice";

type NumberProps = {
  text: string;
}

const NumberButton: FC<NumberProps> = ({ text }) => {
  const dispatch = useDispatch();

  return (
    <Pressable style={Styles.buttons} onPress={() => dispatch(hideNumberModal())}>
      <Text style={Styles.text}>{text}</Text>
    </Pressable>
  );
};

const Styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: Colors.COLOR1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    backgroundColor: Colors.COLOR5,
    borderRadius: 10,
    padding: 10,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  text: {
    color: 'white'
  }
});

export default NumberButton;