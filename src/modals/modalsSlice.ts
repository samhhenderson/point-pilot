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
    },
    confirm: {
      vis: false,
      message: '',
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
    },
    setConfirmModal: (state, action) => {
      state.confirm.vis = true;
      state.confirm.message = action.payload.message;
    },
    hideConfirmModal: state => {
      state.confirm.vis = false
    },
  }
})

export const { 
  showNumberModal, 
  hideNumberModal,
  setNumberModalPlayer,
  showNewGameModal,
  hideNewGameModa,
  setConfirmModal,
  hideConfirmModal,
} = modalsSlice.actions;

export default modalsSlice.reducer;