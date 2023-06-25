import { FC } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import Checkbox from "expo-checkbox";

import * as Colors from '../styles/Colors';
import * as Sizes from '../styles/Sizes';

type CheckBoxProps = {
  value: boolean,
  onValueChange: () => void,
  styles?: ViewStyle[] | {}[],
  color?: string,
}

const CheckBox: FC<CheckBoxProps> = ({ 
  value, 
  onValueChange, 
  styles = [], 
  color = Colors.COLOR1,
}) => {

  return (
    <Checkbox 
      style={[Styles.checkbox, ...styles]} 
      color={color}
      value={value}
      onValueChange={onValueChange}
    />
  );
}

export const Styles = StyleSheet.create({
  checkbox: {
    width: Sizes.SMALL_BUTTONS, 
    height: Sizes.SMALL_BUTTONS, 
    borderRadius: Sizes.MED_BORDER_RADIUS
  },
})

export default CheckBox;