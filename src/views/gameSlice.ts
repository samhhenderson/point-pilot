import { createSlice } from '@reduxjs/toolkit'
import { GameState } from '../types';

export const gameSlice = createSlice({
  name: 'view',
  initialState: {
    gameDisplay: {gameName: 'Whist', lowScoreWins: false, useBid: false, teams: 0},
    gameList: [
      {gameName: 'Whist', lowScoreWins: false, useBid: true, teams: 0},
      {gameName: 'Nerts', lowScoreWins: false, useBid: false, teams: 0}
    ],
  } as GameState,
  reducers: {
    setGameDisplay: (state, action) => {
      state.gameDisplay = action.payload;
    },
  }
})

export const { 
  setGameDisplay
} = gameSlice.actions;

export default gameSlice.reducer;