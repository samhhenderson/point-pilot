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
      game.lowScoreWins? 1 : 0, 
      game.useBid? 1 : 0, 
      game.teams? 1 : 0,
    ])
    .then((response) => response.rows._array[0])
    .catch(error => console.log('INSERT ' + error))
  }
)
  
export const deleteGame = createAsyncThunk(
  'game/deleteGame', 
  async (deletedGame: number, thunkApi) => {
    const query = 
    `UPDATE games
    SET deleted = 1
    WHERE id = ?`
    executeSqlAsync(query, [deletedGame])
    .catch(error => console.log('DELETE ' + error))
  }
)

export const getGames = createAsyncThunk(
  'game/getGames',
  (_, thunkApi) => {
    const query = `SELECT * FROM games`;
    return executeSqlAsync(query, [])
      .then(response => response.rows._array)
      .catch(error => {
        console.log('GET GAMES ' + error);
        return thunkApi.rejectWithValue(error);
      });
  }
);

export const updateGame = createAsyncThunk(
  'game/updateGame',
  (updatedGame: Game, thunkApi) => {
    const query =
      `UPDATE games
      SET name = ?, lowScoreWins = ?, useBid = ?, teams = ?
      WHERE id = ?
      RETURNING *;`;
    return executeSqlAsync(query, [
      updatedGame.name,
      updatedGame.lowScoreWins ? 1 : 0,
      updatedGame.useBid ? 1 : 0,
      updatedGame.teams ? 1 : 0,
      updatedGame.id
    ])
      .then(response => response.rows._array[0])
      .catch(error => {
        console.log('UPDATE ' + error);
        return thunkApi.rejectWithValue(error);
      });
  }
);

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    byId: {},
    allIds: [],
  } as GameState,
  reducers: {

  },
  extraReducers: (builder) => { 
    builder.addCase(addGame.fulfilled, (state, action) => {
      // We don't know the ID, so we use the one returned from the DB
      if (action.payload) {
        state.byId[action.payload.id] = {
          id: action.payload.id,
          name: action.payload.name,
          lowScoreWins: !!action.payload.lowScoreWins,
          useBid: !!action.payload.useBid,
          teams: !!action.payload.teams,
          display: !!action.payload.display,
          deleted: !!action.payload.deleted,
        }
        state.allIds.push(action.payload.id);
      }
    });
    
    builder.addCase(deleteGame.fulfilled, (state, action) => {
      if (action.meta.arg) {
        state.byId[action.meta.arg].deleted = true;
      }
    });

    builder.addCase(getGames.fulfilled, (state, action) => {
      if (action.payload) {
        const newState = {
          ...state,
          byId: {},
          allIds: [],
        } as GameState;
        action.payload.forEach((game: Game) => {
          newState.byId[game.id] = {
            id: game.id,
            name: game.name,
            lowScoreWins: !!game.lowScoreWins,
            useBid: !!game.useBid,
            teams: !!game.teams,
            display: !!game.display,
            deleted: !!game.deleted,
          }
          newState.allIds.push(game.id);
        })
        return newState;
      }
    });
    
    builder.addCase(updateGame.fulfilled, (state, action) => {
      if (action.meta.arg) {
        state.byId[action.meta.arg.id] = action.meta.arg
      }
    });
  },
})

export const { 

} = gameSlice.actions;

export default gameSlice.reducer;