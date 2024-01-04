import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LogState, Log } from '../types';
import { executeSqlAsync } from '../db/db-service';

export const pushEntry = createAsyncThunk(
  'log/pushEntry', 
  async (newPlayer: string, thunkApi) => {
    const query = 
    `INSERT INTO  (name)
    VALUES (?)
    RETURNING *;`
    return executeSqlAsync(query, [newPlayer])
      .then((response) => response.rows._array[0])
      .catch(error => console.log('INSERT ' + error))
  }
)

export const popEntry = createAsyncThunk(
  'player/deletePlayer', 
  async (deletedPlayerId: number, thunkApi) => {
    const query = 
    `UPDATE players
    set deleted = 1
    WHERE id = ?`
    executeSqlAsync(query, [deletedPlayerId])
      .catch(error => console.log('DELETE ' + error))
  }
)

export const getEntries = createAsyncThunk(
  'player/getPlayers',
  async (thunkApi) => {
    const query = `SELECT * FROM players`;
    return executeSqlAsync(query, [])
      .then(response => response.rows._array)
      .catch(error => console.log('GET PLAYERS ' + error))
  }
)

const logSlice = createSlice({
  name: 'log',
  initialState: {
    byId: {},
    allIds: [],
  } as LogState,
  reducers: {

  },
});

export const {} = logSlice.actions;

export default logSlice.reducer;
