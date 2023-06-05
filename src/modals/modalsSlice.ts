import { createSlice } from '@reduxjs/toolkit'
import { ModalsState } from '../types';

export const modalsSlice = createSlice({
  name: 'view',
  initialState: {
    number: {
      vis: false,
      player: '',
      bid: false,
    }
  } as ModalsState,
  reducers: {
    showNumberModal: state => {
      state.number.vis = true
    },
    hideNumberModal: state => {
      state.number.vis = false;
    }
  }
})

export const { showNumberModal, hideNumberModal } = modalsSlice.actions;
export default modalsSlice.reducer;