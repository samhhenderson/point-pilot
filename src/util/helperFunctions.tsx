import { StyleSheet, Text, View, Pressable, Modal, ViewStyle } from "react-native";
import { useState } from "react";

export function pressStyle(...inputStyles: ViewStyle[]) {
  const [isPressed, setIsPressed] = useState(false);

  return {
    style: [
      ...inputStyles,
      { opacity: isPressed ? 0.8 : 1.0 },
    ],
    onPressIn: () => setIsPressed(true),
    onPressOut: () => setIsPressed(false),
  };
}
