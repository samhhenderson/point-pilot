import { createSlice } from '@reduxjs/toolkit'
import { player } from '../types';

interface PlayerState{
  players: player[]
}

export const activePlayerSlice = createSlice({
  name: 'activePlayer',
  initialState: {
    players: [{name: 'Sam', score: 20, bid: 5}, {name: 'Emily', score: 30, bid: 6}]
  } as PlayerState,
  reducers: {
    addPlayer: (state, action) => {
      state.players.push(action.payload);
    }
  }
})

export const { addPlayer } = activePlayerSlice.actions;
export default activePlayerSlice.reducer;