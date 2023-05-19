import { FC } from "react";
import { StyleSheet, Text, View, Pressable, Modal } from "react-native";
import NumberButton from '../common/NumberButton'

import { useSelector, useDispatch } from 'react-redux';

import { State } from "../types";
import * as Colors from './../styles/Colors';

const NumberModal: FC = () => {
  const numberModalVis = useSelector((state: State) => state.view.numberModalVis)
  const dispatch = useDispatch();
  console.log(numberModalVis)
  
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={numberModalVis}
    >
      <View style={Styles.container}>
        <NumberButton 
          text='1'
        />

      </View>

    </Modal>
  );
};

export default NumberModal;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30,
    marginTop: 50,
    borderRadius: 20,

  }
});