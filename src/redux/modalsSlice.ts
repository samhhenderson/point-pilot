import { createSlice } from '@reduxjs/toolkit'
import { ModalsState } from '../types';

export const modalsSlice = createSlice({
  name: 'modals',
  initialState: {
    number: {
      vis: false,
      playerSessionId: 0,
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
      confirmed: false,
    }
  } as ModalsState,
  reducers: {
    hideNumberModal: state => {
      state.number.vis = false;
    },
    setNumberModal:(state, action) => {
      state.number.playerSessionId = action.payload.playerSessionId;
      state.number.isBid = action.payload.isBid;
      state.number.vis = true
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
  hideNumberModal,
  setNumberModal,
  showNewGameModal,
  hideNewGameModal,
  setConfirmModal,
  hideConfirmModal,
} = modalsSlice.actions;

export default modalsSlice.reducer;