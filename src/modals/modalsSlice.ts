import { createSlice } from '@reduxjs/toolkit'
import { ModalsState } from '../types';

export const modalsSlice = createSlice({
  name: 'modals',
  initialState: {
    number: {
      vis: false,
      playerName: 'Emily',
      isBid: false,
    },
    newGame: {
      vis: false,
    }
  } as ModalsState,
  reducers: {
    showNumberModal: state => {
      state.number.vis = true
    },
    hideNumberModal: state => {
      state.number.vis = false;
    },
    setNumberModalPlayer:(state, action) => {
      state.number.playerName = action.payload.playerName;
      state.number.isBid = action.payload.isBid;
    },
    showNewGameModal: state => {
      state.newGame.vis = true
    },
    hideNewGameModa: state => {
      state.newGame.vis = false
    }
  }
})

export const { 
  showNumberModal, 
  hideNumberModal,
  setNumberModalPlayer,
  showNewGameModal,
  hideNewGameModa,
} = modalsSlice.actions;

export default modalsSlice.reducer;