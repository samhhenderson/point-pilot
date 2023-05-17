import * as actions from './actions'
import { createSlice } from '@reduxjs/toolkit'

interface player {
  name: string,
  score: number,
}

interface state {
  players: player[],
}

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    players: []
  },
  reducers: {
    add: (state: state, action) => {
      state.players.push(action.payload);
    }
  }
})

export const { add } = playerSlice.actions;
export default playerSlice.reducer;