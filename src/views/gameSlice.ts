import { createSlice } from '@reduxjs/toolkit'
import { GameState } from '../types';

export const gameSlice = createSlice({
  name: 'view',
  initialState: {
    activeGame: {gameName: '', lowScoreWins: false, useBid: false, teams: false},
    gameList: [
      {gameName: 'Whist', lowScoreWins: false, useBid: true, teams: false},
      {gameName: 'Nerts', lowScoreWins: false, useBid: false, teams: true}
    ],
  } as GameState,
  reducers: {
    setActiveGame: (state, action) => {
      state.activeGame = action.payload;
    },
    changeActiveGame: (state, action) => {
      Object.assign(state.activeGame, action.payload)
    }
  }
})

export const { 
  setActiveGame,
  changeActiveGame
} = gameSlice.actions;

export default gameSlice.reducer;