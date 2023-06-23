import { FC, useState } from "react";
import { StyleSheet, Text, View, Pressable, ViewStyle } from "react-native";

import * as Colors from '../styles/Colors';
import * as Sizes from '../styles/Sizes';
import { CommonStyles } from "../styles/CommonStyles";


type ControlProps = {
  text?: string,
  pressableStyles?: ViewStyle[] | {}[],
  textStyles?: ViewStyle[] | {}[],
  onPress: any,
}

const Control: FC<ControlProps> = ({ 
  text, 
  pressableStyles = [], 
  textStyles = [], 
  onPress,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
      <Pressable
        style={[
          Styles.buttons,
          ...pressableStyles,
          { opacity: isPressed ? 0.8 : 1.0 },
        ]}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        onPress={onPress}
      >
        <Text style={[CommonStyles.text, ...textStyles]}>{text}</Text>
      </Pressable>
  );
}

export const Styles = StyleSheet.create({
  buttons: {
    backgroundColor: Colors.COLOR4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: Sizes.MED_BUTTONS,
    height: Sizes.MED_BUTTONS,
    borderRadius: 10,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
})

export default Control;