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
      gameId: 0,
    },
    confirm: {
      vis: false,
      message: '',
      confirmFunc: '',
      confirmArgs: [''],
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
    showNewGameModal: (state, action) => {
      state.newGame.gameId = action.payload;
      state.newGame.vis = true;
    },
    hideNewGameModal: state => {
      state.newGame.vis = false
    },
    setConfirmModal: (state, action) => {
      state.confirm.vis = true;
      state.confirm.message = action.payload.message;
      state.confirm.confirmFunc = action.payload.confirmFunc;
      state.confirm.confirmArgs = action.payload.confirmArgs;
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
  hideNewGameModal,
  setConfirmModal,
  hideConfirmModal,
} = modalsSlice.actions;

export default modalsSlice.reducer;