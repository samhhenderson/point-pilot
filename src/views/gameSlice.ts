//import redux methods
import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit';

//import other
import { GameState } from '../types';
import { executeSqlAsync } from '../db/db-service';

export const getGames = createAsyncThunk(
  'player/getGames',
  async (thunkApi) => {
    const query = `SELECT * FROM Players`;
    return executeSqlAsync(query, [])
      .then(response => response.rows._array)
      .catch(error => console.log('GET PLAYERS ' + error))
  }
)


export const gameSlice = createSlice({
  name: 'view',
  initialState: {
    activeGame: {gameName: '', lowScoreWins: false, useBid: false, teams: false},
    gameList: [
      {gameName: 'Whist', lowScoreWins: false, useBid: true, teams: false},
      {gameName: 'Nerts', lowScoreWins: false, useBid: false, teams: true},
    ],
  } as GameState,
  reducers: {
    setActiveGame: (state, action) => {
      const game = state.gameList.find((g) => g.gameName === action.payload);
      if (game) state.activeGame = game;
    },
    changeActiveGame: (state, action) => {
      Object.assign(state.activeGame, action.payload);
    },
    addGame: (state, action) => {
      const gameIndex = state.gameList.findIndex((g) => {
        return g.gameName === action.payload.gameName
      });
      if (gameIndex !== -1) state.gameList.splice(gameIndex, 1, action.payload);
      else state.gameList.push(action.payload)
    },
    deleteGame: (state, action) => {
      const gameIndex = state.gameList.findIndex((g) => g.gameName === action.payload);
      state.gameList.splice(gameIndex, 1);
    },
  }
})

export const { 
  setActiveGame,
  changeActiveGame,
  addGame,
  deleteGame,
} = gameSlice.actions;

export default gameSlice.reducer;