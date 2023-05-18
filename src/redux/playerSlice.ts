import { createSlice } from '@reduxjs/toolkit'
import { player } from '../types';

interface PlayerState{
  players: player[]
}

export const activePlayerSlice = createSlice({
  name: 'activePlayer',
  initialState: {
    players: [{name: 'Sam', score: 20}, {name: 'Emily', score: 30}]
  } as PlayerState,
  reducers: {
    add: (state, action) => {
      state.players.push(action.payload);
    }
  }
})

export const { add } = activePlayerSlice.actions;
export default activePlayerSlice.reducer;