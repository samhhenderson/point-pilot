import { FC, useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable, Modal, ViewStyle } from "react-native";

import { useSelector, useDispatch } from 'react-redux';
import { hideNumberModal } from "./modalsSlice";
import { changeScore } from "../components/playerDisplaySlice";

import { State } from "../types";
import * as Colors from './../styles/Colors';
import * as Sizes from './../styles/Sizes'
import { pressStyle } from "../util/helperFunctions";
import { CommonStyles } from "../styles/CommonStyles";

const NumberModal: FC = () => {
  const { vis, playerName, isBid} = useSelector((state: State) => state.modals.number);

  const dispatch = useDispatch();

  const [numDisplay, setNumDisplay] = useState('');
  const [isPositive, setIsPositive] = useState(true);

  const posOrNegSign: string = isPositive ? '+' : '-';
  const numberButtons:  JSX.Element[] = [];

  // Create Numpad. Doing it this way let's us be DRY with the 'O'
  const numberButtonsArray = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '-', '0', 'X']
  numberButtonsArray.forEach(num => {
    switch(num) {
      case '-':
        const symbol: string = isPositive ? '-' : '+';
        numberButtons.push(
          <Pressable 
            {...pressStyle(CommonStyles.buttons, Styles.minusBackButtons,)}
            onPress={() => setIsPositive(!isPositive)}
          >
            <Text style={Styles.text}>{symbol}</Text>
          </Pressable>
        )
        break;
      case 'X':
        numberButtons.push(
          <Pressable 
            {...pressStyle(CommonStyles.buttons, Styles.minusBackButtons,)}
            onPress={() => setNumDisplay((oldNumDisplay) => {
              return oldNumDisplay.slice(0,-1);
            })}
          >
            <Text style={Styles.text}>⌫</Text>
          </Pressable>
        )
        break;
      default:
        numberButtons.push(
          <Pressable 
            {...pressStyle(CommonStyles.buttons)}
            onPress={() => setNumDisplay(numDisplay.concat(num))}
          >
            <Text style={Styles.text}>{num}</Text>
          </Pressable>
        )
    }
  })

  function acceptScore() {
    let score: number = parseInt(numDisplay);
    if (posOrNegSign === '-') score *= -1;
    dispatch(changeScore({
      playerName: playerName, 
      scoreToAdd: score,
      isBid: isBid
    }));  dispatch(hideNumberModal());
  }

  useEffect(() => {
    setNumDisplay('')
    setIsPositive(true)
  },[vis])
  
  return (
    <Modal
      animationType='slide'
      transparent={true}
      visible={vis}
    >
      <View style={Styles.modal}>
        <View style={Styles.container}>
          <View style={Styles.display}>
            <Text style={Styles.text}>{posOrNegSign}</Text>
            <Text style={Styles.text} numberOfLines={1}>{numDisplay}</Text>
          </View>
          {numberButtons}
        <Pressable
          {...pressStyle(CommonStyles.buttons, Styles.okButton)}
          onPress={acceptScore}
        >
          <Text style={[CommonStyles.text, {fontSize: 40}]}>OK</Text>
        </Pressable>
        <Pressable
          {...pressStyle(CommonStyles.buttons, Styles.cancelButton)}
          onPress={() => dispatch(hideNumberModal())}
        >
          <Text style={[CommonStyles.text, {fontSize: 40}]}>X</Text>
        </Pressable>
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
    flexDirection: 'row',
    backgroundColor: Colors.DARK,
    color: 'white',
    fontSize: 40,
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 10,
  }, 
  text: {
    color: 'white',
    fontSize: 40,
  },
  minusBackButtons: {
    backgroundColor: Colors.COLOR1,
  },
  okButton: {
    width: 150,
    backgroundColor: Colors.COLOR1,
    marginTop: 10
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: Colors.COLOR5,
  }
});

const okButtonStyles = StyleSheet.create({
  okButton: {
    width: 150,
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