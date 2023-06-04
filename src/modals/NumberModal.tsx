import { FC, useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable, Modal, ViewStyle } from "react-native";
import NumberButton from '../common/NumberButton';

import { useSelector, useDispatch } from 'react-redux';
import { showNumberModal, hideNumberModal } from "../redux/viewSlice";

import { State } from "../types";
import * as Colors from './../styles/Colors';
import * as Sizes from './../styles/Sizes'
import { pressStyle } from "../util/helperFunctions";
import { CommonStyles } from "../styles/CommonStyles";
import Control from "../common/Controls";

const NumberModal: FC = () => {
  const numberModalVis = useSelector((state: State) => state.view.numberModalVis)
  const dispatch = useDispatch();
  const [numDisplay, setNumDisplay] = useState('');
  const [isPositive, setIsPositive] = useState(true);

  // Create Numpad. Doing it this way allows us to be DRY for the '0'
  let numberButtons:  JSX.Element[] = [];
  const numberButtonsArray = ['7', '8', '9', '4', '5', '6', '3', '2', '1', '-', '0', 'X']
  numberButtonsArray.forEach(num => {
    switch(num) {
      case '-':
        const symbol: string = isPositive ? '-' : '+';
        numberButtons.push(
          <Pressable 
            {...pressStyle(CommonStyles.buttons, Styles.minusBackButtons)}
            onPress={() => setIsPositive(!isPositive)}
          >
            <Text style={Styles.text}>{symbol}</Text>
          </Pressable>
        )
        break;
      case 'X':
        break;
      default:
        numberButtons.push(
          <NumberButton 
          text={num}
          setNumDisplay={setNumDisplay}
          numDisplay={numDisplay}
        />
        )
    }
  })

  useEffect(() => {
    setNumDisplay('')
  },[numberModalVis])
  
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={numberModalVis}
    >
      <View style={Styles.modal}>
        <View style={Styles.container}>
          <View style={Styles.display}>
            <Text style={Styles.text}>{numDisplay}</Text>
          </View>
          {numberButtons}
        <Control
          text={'OK'}
          optionalStyle={okButtonStyles}
        />
        <Control
          text={'CANCEL'}
          action={hideNumberModal}
          optionalStyle={cancelButtonStyles}
        />
        </View>
      </View>
    </Modal>
  );
};

export default NumberModal;

const Styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: Colors.COLOR2,
    justifyContent: 'center',
    alignContent: 'center',
    maxWidth: 330,
    maxHeight: 600,
    marginTop: 50,
    borderRadius: 20,
    padding: 30,
    gap: 10,

  },
  display: {
    minWidth: 200,
    height: 70,
    borderRadius: 20,
    flex: 1,
    backgroundColor: Colors.DARK,
    color: 'white',
    fontSize: 40,
    justifyContent: 'flex-end',
    padding: 10,
    marginBottom: 10,
  }, 
  text: {
    color: 'white',
    fontSize: 40,
  },
  minusBackButtons: {
    backgroundColor: Colors.COLOR1,
    height: Sizes.medButtons,
    width: Sizes.medButtons,
  }

});

const okButtonStyles = StyleSheet.create({
  button: {
    width: 150,
    height: Sizes.medButtons,
    backgroundColor: Colors.COLOR1,
    marginTop: 10
  },
  text: {
    fontSize: 30
  }
})

const cancelButtonStyles = StyleSheet.create({
  button: {
    width: Sizes.medButtons,
    height: Sizes.medButtons,
    marginTop: 10,
  },
  text: {
    fontSize: 15
  }
})