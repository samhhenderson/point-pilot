import { FC } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import * as Colors from './../styles/Colors'
import Control from "./Controls";


const Styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    borderColor: Colors.COLOR2,
    borderWidth: 5,
    backgroundColor: Colors.COLOR1,
    justifyContent: 'space-between',
    padding: 10,
    gap: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 30,
  }
});

type PlayerProps = {
  name: string;
}

const Player: FC<PlayerProps> = ({ name }) => {

  return (
    <View style={Styles.container}>
      <Text style={Styles.text}>{name}</Text>
      <Control />
    </View>
  );
};

export default Player;