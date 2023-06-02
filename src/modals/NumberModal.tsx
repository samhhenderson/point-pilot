import { FC, useState } from "react";
import { StyleSheet, Text, View, Pressable, Modal } from "react-native";
import NumberButton from '../common/NumberButton'

import { useSelector, useDispatch } from 'react-redux';

import { State } from "../types";
import * as Colors from './../styles/Colors';

const NumberModal: FC = () => {
  const numberModalVis = useSelector((state: State) => state.view.numberModalVis)
  const dispatch = useDispatch();
  const [numDisplay, setNumDisplay] = useState('');

  let numberButtons:  JSX.Element[] = [];
  const numberButtonsArray = ['7', '8', '9', '4', '5', '6', '3', '2', '1', '-', '0', 'X']
  numberButtonsArray.forEach(num => {
    numberButtons.push(
      <NumberButton 
      text={num}
      setNumDisplay={setNumDisplay}
      numDisplay={numDisplay}
    />
    )
  })
  console.log(numberModalVis)
  
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={numberModalVis}
    >
      <View style={Styles.container}>
        <Text style={Styles.display}>{numDisplay}</Text>
        {numberButtons}

      </View>

    </Modal>
  );
};

export default NumberModal;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: Colors.COLOR2,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 30,
    marginTop: 50,
    borderRadius: 20,
    padding: 30,
    gap: 10,

  },
  display: {
    minWidth: 200,
    height: 70,
    //BorderRadius doesn't work on ios text elements, gotta wrap it in a view
    borderRadius: 20,
    flex: 1,
    backgroundColor: Colors.DARK,
    color: 'white',
    fontSize: 40,
    justifyContent: 'flex-end',
    padding: 10,
  }
});