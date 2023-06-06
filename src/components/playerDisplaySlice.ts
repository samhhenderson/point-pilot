import { createSlice } from '@reduxjs/toolkit'
import { PlayerState } from '../types';

export const playerDisplaySlice = createSlice({
  name: 'playerDisplay',
  initialState: {
    players: [{name: 'Sam', score: 21, bid: 5}, {name: 'Emily', score: 20, bid: 6},]
  } as PlayerState,
  reducers: {
    addPlayer: (state, action) => {
      state.players.push(action.payload);
    },
    changeScore: (state, action) => {
      const { playerName, scoreToAdd, isBid } = action.payload;
      const player = state.players.find((p) => p.name === playerName);
      if (player && !isBid) player.score += scoreToAdd;
      else if (player) player.bid += scoreToAdd;
    }
  }
})

export const { addPlayer, changeScore } = playerDisplaySlice.actions;
export default playerDisplaySlice.reducer;