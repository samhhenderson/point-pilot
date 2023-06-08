import { createSlice } from '@reduxjs/toolkit'
import { PlayerState } from '../types';

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    playerList: [
      {name: 'Sam', active: true, score: 0, bid: 0}, 
      {name: 'Emily', active: true, score: 0, bid: 0},
      {name: 'Kevin', active: false, score: 0, bid: 0}, 
      {name: 'Julia', active: false, score: 0, bid: 0},
    ],
  } as PlayerState,
  reducers: {
    addPlayer: (state, action) => {
      //double check that the new player is unique
      if (!state.playerList.some(player => player.name === action.payload.name)) {
        state.playerList.push(action.payload);
      }
    },
    changeActivePlayer: (state, action) => {
      const player = state.playerList.find((p) => p.name === action.payload);
      if (player) player.active = !player.active;

    },
    deletePlayer: (state, action) => {

    },
    changeScore: (state, action) => {
      const { playerName, scoreToAdd, isBid } = action.payload;
      const player = state.playerList.find((p) => p.name === playerName);
      if (player && !isBid) player.score += scoreToAdd;
      else if (player) player.bid += scoreToAdd;
    }
  }
})

export const { addPlayer, changeActivePlayer, changeScore } = playerSlice.actions;
export default playerSlice.reducer;