import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Player, PlayerState } from '../types';
import { executeSqlAsync } from '../db/db-service';

export const addPlayer = createAsyncThunk(
  'player/addPlayer', 
  async (newPlayer: string, thunkApi) => {
    const query = 
    `INSERT INTO players (name)
    VALUES (?)
    RETURNING *;`
    return executeSqlAsync(query, [newPlayer])
      .then((response) => response.rows._array[0])
      .catch(error => console.log('INSERT ' + error))
  }
)

export const deletePlayer = createAsyncThunk(
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
        state.byId[action.payload.id] = {
          id: action.payload.id,
          name: action.payload.name,
          icon: action.payload.icon,
          deleted: !!action.payload.deleted
        }
        state.allIds.push(action.payload.id);
      }
    });
    builder.addCase(deletePlayer.fulfilled, (state, action) => {
      if (action.meta.arg) {
        state.byId[action.meta.arg].deleted = true;
      }

    });
    builder.addCase(getPlayers.fulfilled, (state, action) => {
      if (action.payload) {
        const newState = {
          byId: {},
          allIds: [],
        } as PlayerState;
        action.payload.forEach((player: Player) => {
          newState.byId[player.id] = {
            id: player.id,
            name: player.name,
            icon: player.icon,
            deleted: !!player.deleted
          };
          newState.allIds.push(player.id);
        })
        return newState;
      }
    });
  }
})

export const { 

} = playerSlice.actions;
export default playerSlice.reducer;