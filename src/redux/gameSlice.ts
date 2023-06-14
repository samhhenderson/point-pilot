//import redux methods
import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit';

//import other
import { GameState, Game } from '../types';
import { executeSqlAsync } from '../db/db-service';


export const addGame = createAsyncThunk(
  'game/addGame', 
  async (game: Game, thunkApi) => {
    const query = 
    `INSERT INTO games (name, lowScoreWins, useBid, teams)
    VALUES (?, ?, ?, ?)
    RETURNING *;`
    return executeSqlAsync(query, [
      game.name, 
      game.lowScoreWins, 
      game.useBid, 
      game.teams
    ])
    .then((response): Game => response.rows._array[0])
    .catch(error => console.log('INSERT ' + error))
  }
)
  
export const deleteGame = createAsyncThunk(
  'game/deleteGame', 
  async (deletedGame: number, thunkApi) => {
    const query = 
    `DELETE FROM games
    WHERE id = ?`
    executeSqlAsync(query, [deletedGame])
    .catch(error => console.log('DELETE ' + error))
  }
)

export const getGames = createAsyncThunk(
  'game/getGames',
  async (thunkApi) => {
    const query = `SELECT * FROM games`;
    return executeSqlAsync(query, [])
      .then(response => response.rows._array)
      .catch(error => console.log('GET GAMES ' + error))
  }
)

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    activeGame: {id: 0, name: '', lowScoreWins: 0, useBid: 0, teams: 0, display: 1},
    byId: {},
    allIds: [],
  } as GameState,
  reducers: {
    setActiveGame: (state, action) => {
      const game = state.byId[action.payload];
      if (game) state.activeGame = game;
    },
    changeActiveGame: (state, action) => {
      Object.assign(state.activeGame, action.payload);
    },
    addGame: (state, action) => {
      state.byId[action.payload.id] = action.payload;
      state.allIds.push(action.payload);
    },
    deleteGame: (state, action) => {
      delete state.byId[action.payload];
      state.allIds = state.allIds.filter((id) => id !== action.payload);
    },
  },
  extraReducers: (builder) => { 
    builder.addCase(addGame.fulfilled, (state, action) => {
      if (action.payload) {
        state.byId[action.payload.id] = action.payload;
        state.allIds.push(action.payload.id);
      }
    });
    
    builder.addCase(deleteGame.fulfilled, (state, action) => {
      delete state.byId[action.meta.arg];
      state.allIds = state.allIds.filter((id) => id !== action.meta.arg);
    });

    builder.addCase(getGames.fulfilled, (state, action) => {
      if (action.payload) {
        action.payload.forEach((game: Game) => {
          state.byId[game.id] = game;
          state.allIds.push(game.id);
        })
      }
    });
    
  },
})

export const { 
  setActiveGame,
  changeActiveGame,
} = gameSlice.actions;

export default gameSlice.reducer;