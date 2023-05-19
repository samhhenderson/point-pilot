import { createSlice } from '@reduxjs/toolkit'
import { ViewState } from '../types';

export const viewSlice = createSlice({
  name: 'view',
  initialState: {
    numberModalVis: false
  } as ViewState,
  reducers: {
    showNumberModal: state => {
      state.numberModalVis = true;
    },
    hideNumberModal: state => {
      state.numberModalVis = false;
    }
  }
})

export const { showNumberModal, hideNumberModal } = viewSlice.actions;
export default viewSlice.reducer;