// REACT NATIVE IMPORTS
import { FC, useState, useEffect } from "react";
import { StyleSheet, Text, View, Modal } from "react-native";

// REDUX IMPORTS
import { useSelector, useDispatch } from 'react-redux';
import { hideNumberModal } from "../redux/modalsSlice";
import { updatePlayerSession } from "../redux/playerSessionSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";

// OTHER IMPORTS
import { State } from "../types";
import * as Colors from './../styles/Colors';
import * as Sizes from './../styles/Sizes'
import { CStyles } from "../styles/CommonStyles";
import Control from "../components/Control";

const NumberModal: FC = () => {
  const { 
    vis, 
    playerSessionId, 
    isBid
  } = useSelector((state: State) => state.modals.number);

  const playerSession = useSelector((state: State) => {
    return state.playerSession.byId[playerSessionId]
  });

  const resetBid = useSelector((state: State) => {
    return state.setting.byId['resetBid'].value
  });

  const dispatch = useDispatch();
  const dispatchThunk:ThunkDispatch<State, null, any> = useDispatch();

  const [numDisplay, setNumDisplay] = useState('0');
  const [isPositive, setIsPositive] = useState(true);
  const [viewWidth, setViewWidth] = useState(0);

  const posOrNegSign: string = isPositive ? '+' : '-';
  const numberButtons:  JSX.Element[] = [];

  // Create Numpad. Doing it this way let's us be DRY with the 'numbers'
  const numberButtonsArray = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '-', '0', 'back']
  numberButtonsArray.forEach(num => {
    switch(num) {
      case '-':
        const symbol: string = isPositive ? '-' : '+';
        numberButtons.push(
          <Control
            key={num}
            text={symbol}
            onPress={() => setIsPositive(!isPositive)}
            pressableStyles={[Styles.minusBackButtons]}
            textStyles={[{fontSize:40}]}
          />
        )
        break;
      case 'back':
        numberButtons.push(
          <Control
            key={num}
            text={'⌫'}
            onPress={handleNumDelete}
            pressableStyles={[Styles.minusBackButtons]}
            textStyles={[{fontSize:40}]}
          />
        )
        break;
      default:
        numberButtons.push(
          <Control
            key={num}
            text={num}
            onPress={() => handleNumInput(num)}
            pressableStyles={[{backgroundColor: Colors.COLOR2}]}
            textStyles={[{fontSize:40}]}
          />
        )
    }
  })

  function handleNumInput(n: string) {
    if (numDisplay === '0') setNumDisplay(n)
    else setNumDisplay((oldNumDisplay) => oldNumDisplay.concat(n))
  }

  function handleNumDelete() {
    setNumDisplay(oldNumDisplay => {
      let newNumDisplay = oldNumDisplay.slice(0,-1);
      if (newNumDisplay === '') newNumDisplay = '0'
      return newNumDisplay;
    })
  }

  function acceptScore() {
    let delta: number = parseInt(numDisplay);
    let newBid: number = playerSession.bid;
    let newScore: number = playerSession.score;

    if (posOrNegSign === '-') delta *= -1;

    if (isBid) newBid += delta;
    else {
      if (resetBid) newBid = 0;
      newScore += delta;
    }

    dispatchThunk(updatePlayerSession({
      ...playerSession,
      bid: newBid,
      score: newScore,
    }));  

    dispatch(hideNumberModal());
  }

  useEffect(() => {
    setNumDisplay('0')
    setIsPositive(true)
  },[vis])

  return (
    <Modal
      animationType='none'
      transparent={true}
      visible={vis}
    >
      <View style={CStyles.modalCont}>
        <View 
          style={[CStyles.largeModal, Styles.largeModalChanges]}
          onLayout={(event) => {
            
            setViewWidth(event.nativeEvent.layout.width)}}
        >
          <View style={[Styles.display, {width: viewWidth - 60}]}>
            <Text style={Styles.text}>{posOrNegSign}</Text>
            <Text style={Styles.text} numberOfLines={1}>{numDisplay}</Text>
          </View>
          {numberButtons}
        <Control
          onPress={acceptScore}
          text={'OK'}
          pressableStyles={[Styles.okButton]}
          textStyles={[{fontSize:40}]}
        />
        <Control
          onPress={() => dispatch(hideNumberModal())}
          text={'X'}
          pressableStyles={[Styles.cancelButton]}
          textStyles={[{fontSize:40}]}
        />
        </View>
      </View>
    </Modal>
  );
};

export default NumberModal;

const Styles = StyleSheet.create({

  largeModalChanges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: 330,
    maxHeight: 600,
  },
  display: {
    height: 70,
    borderRadius: Sizes.MED_BORDER_RADIUS,
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
    backgroundColor: Colors.COLOR5,
  },
  okButton: {
    width: 150,
    marginTop: 10
  },
  cancelButton: {
    marginTop: 10,
    backgroundColor: Colors.COLOR5,
  }
});
