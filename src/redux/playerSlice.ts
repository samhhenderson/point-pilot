import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Player, PlayerState } from '../types';
import { db, executeSqlAsync } from '../db/db-service';
import { Query } from 'expo-sqlite';

export const addPlayer = createAsyncThunk(
  'player/addPlayer', 
  async (newPlayer: string, thunkApi) => {
    const query = 
    `INSERT INTO players (name)
    VALUES (?)
    RETURNING *;`
    return executeSqlAsync(query, [newPlayer])
      .then((response): Player => response.rows._array[0])
      .catch(error => console.log('INSERT ' + error))
  }
)

export const deletePlayer = createAsyncThunk(
  'player/deletePlayer', 
  async (deletedPlayerId: number, thunkApi) => {
    const query = 
    `DELETE FROM players
    WHERE id = ?`
    executeSqlAsync(query, [deletedPlayerId])
      .catch(error => console.log('DELETE ' + error))
  }
)

export const getPlayers = createAsyncThunk(
  'player/getPlayers',
  async (thunkApi) => {
    const query = `SELECT * FROM players`;
    return executeSqlAsync(query, [])
      .then(response => response.rows._array)
      .catch(error => console.log('GET PLAYERS ' + error))
  }
)

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    byId: {},
    allIds: [],
  } as PlayerState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(addPlayer.fulfilled, (state, action) => {
      if (action.payload) {
        state.byId[action.payload.id] = action.payload;
        state.allIds.push(action.payload.id);
      }
    });
    builder.addCase(deletePlayer.fulfilled, (state, action) => {
      delete state.byId[action.meta.arg];
      state.allIds = state.allIds.filter(id => id !== action.meta.arg);
    });
    builder.addCase(getPlayers.fulfilled, (state, action) => {
      if (action.payload) {
        state.byId = {};
        state.allIds = [];
        action.payload.forEach((player: Player) => {
          state.byId[player.id] = player;
          state.allIds.push(player.id);
        })
      }
    });
  }
})

export const { 

} = playerSlice.actions;
export default playerSlice.reducer;