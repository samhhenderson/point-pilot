//import redux methods
import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit';

//import other
import { PlayerSessionState, PlayerSession } from '../types';
import { executeSqlAsync } from '../db/db-service';

export const addPlayerSession = createAsyncThunk(
  'playerSession/addPlayerSession', 
  async (newPlayerSession: PlayerSession, thunkApi) => {
    const query = 
    `INSERT INTO playerSessions (playerId, sessionId)
    VALUES (?, ?)
    RETURNING *;`
    return executeSqlAsync(query, [
      newPlayerSession.playerId,
      newPlayerSession.sessionId,
    ])
    .then(response => response.rows._array[0])
    .catch(error => console.log('INSERT ' + error))
  }
)
  
export const deletePlayerSession = createAsyncThunk(
  'playerSession/deletePlayerSession', 
  async (deletedPlayerSession: number, thunkApi) => {
    const query = 
    `DELETE FROM playerSessions
    WHERE id = ?`
    executeSqlAsync(query, [deletedPlayerSession])
    .catch(error => console.log('DELETE ' + error))
  }
)

export const updatePlayerSession = createAsyncThunk(
  'playerSession/updatePlayerSession',
  async (updatedPlayerSession: PlayerSession, thunkApi) => {
    const query =
    `UPDATE playerSessions
    SET score = ?, bid = ?, team = ?,
    WHERE id = ?;`
    return executeSqlAsync(query, [
      updatedPlayerSession.score,
      updatedPlayerSession.bid,
      updatedPlayerSession.team,
      updatedPlayerSession.id
    ])
    .then((response): PlayerSession => response.rows._array[0])
    .catch(error => console.log('UPDATE ' + error))
  }
)

export const getPlayerSessions = createAsyncThunk(
  'playerSession/getPlayerSessions',
  async (_, thunkApi) => {
    const query = `SELECT * FROM playerSessions`;
    return executeSqlAsync(query, [])
      .then(response => response.rows._array)
      .catch(error => console.log('GET SESSIONS ' + error))
  }
)

export const playerSessionSlice = createSlice({
  name: 'playerSession',
  initialState: {
    byId: {},
    allIds: [],
  } as PlayerSessionState,
  reducers: {

  },
  extraReducers: (builder) => {
    // Add new playerSession - only executes at PLAY!
    builder.addCase(addPlayerSession.fulfilled, (state, action) => {
      if (action.payload) {
        state.byId[action.payload.id] = action.payload as PlayerSession;
        state.allIds.push(action.payload.id);
      }
    });
    // Delete will be needed when HISTORY is implemented
    builder.addCase(deletePlayerSession.fulfilled, (state, action) => {
      delete state.byId[action.meta.arg];
      state.allIds = state.allIds.filter((id) => id !== action.meta.arg);
    });

    builder.addCase(getPlayerSessions.fulfilled, (state, action) => {

      if (action.payload) {
        state.byId = {};
        state.allIds = [];
        action.payload.forEach((playerSession) => {
          state.byId[playerSession.id] = playerSession as PlayerSession;
          state.allIds.push(playerSession.id);
        })
      }
      console.log('GET SESSIONS: ', state.byId)
    });
    // Update playerSession - only executes at END GAME
    builder.addCase(updatePlayerSession.fulfilled, (state, action) => {
      if (action.payload) {
        state.byId[action.payload.id] = action.payload;
      }
    });
    
  },
})

export const { 


} = playerSessionSlice.actions;

export default playerSessionSlice.reducer;