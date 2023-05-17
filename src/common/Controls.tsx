import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import * as Colors from './../styles/Colors'


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

const Control: React.FC = () => {
  return (
    <Pressable style={Styles.buttons} onPress={() => console.log('hi')}>
      <Text style={Styles.text}>+</Text>
    </Pressable>
  );
};

export default Control;