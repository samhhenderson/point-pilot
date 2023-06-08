import { FC } from "react";
import { StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";

import * as Colors from '../styles/Colors';
import * as Sizes from '../styles/Sizes';

type CheckBoxProps = {
  value: boolean,
  onValueChange: () => void,
}

const CheckBox: FC<CheckBoxProps> = ({ value, onValueChange }) => {

  return (
    <Checkbox 
      style={Styles.checkbox} 
      color={Colors.COLOR1}
      value={value}
      onValueChange={onValueChange}
    />
  );
}

export const Styles = StyleSheet.create({
  checkbox: {
    width: Sizes.smallButtons, 
    height: Sizes.smallButtons, 
    borderRadius: 10
  },
})

export default CheckBox;