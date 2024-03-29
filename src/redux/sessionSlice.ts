//import redux methods
import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit';

//import other
import { SessionState, Session } from '../types';
import { executeSqlAsync } from '../db/db-service';

export const addSession = createAsyncThunk(
  'session/addSession', 
  async (gameId: number, thunkApi) => {
    const query = 
    `INSERT INTO sessions (date, gameId, complete)
    VALUES (?, ?, ?)
    RETURNING *;`;
    const date = new Date().toLocaleString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: '2-digit',
    });
    return executeSqlAsync(query, [
      date, 
      gameId, 
      0, 
    ])
    .then(response => response.rows._array[0])
    .catch(error => console.log('INSERT ' + error))
  }
)
  
export const deleteSession = createAsyncThunk(
  'session/deleteSession', 
  async (deletedSession: number, thunkApi) => {
    const query = 
    `DELETE FROM sessions
    WHERE id = ?`
    executeSqlAsync(query, [deletedSession])
    .catch(error => console.log('DELETE ' + error))
  }
)

export const updateSession = createAsyncThunk(
  'session/updateSession',
  async (updatedSessionId: number, thunkApi) => {
    const query =
    `UPDATE sessions
    SET date = ?, complete = ?
    WHERE id = ?;`;
    const date = new Date().toLocaleString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: '2-digit',
    });
    return executeSqlAsync(query, [
      date,
      1,
      updatedSessionId
    ])
    .then((response): Session => response.rows._array[0])
    .catch(error => console.log('UPDATE ' + error))
  }
)

export const getSessions = createAsyncThunk(
  'session/getSessions',
  async (_, thunkApi) => {
    const query = `SELECT * FROM sessions`;
    return executeSqlAsync(query, [])
      .then(response => response.rows._array)
      .catch(error => console.log('GET SESSIONS ' + error))
  }
)

export const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    byId: {},
    allIds: [],
  } as SessionState,
  reducers: {

  },
  extraReducers: (builder) => {
    // Add new session - only executes at PLAY!
    builder.addCase(addSession.fulfilled, (state, action) => {
      if (action.payload) {
        state.byId[action.payload.id] = {
          ...action.payload,
          complete: !!action.payload.complete,
        } as Session;
        state.allIds.push(action.payload.id);
      }
    });

    builder.addCase(deleteSession.fulfilled, (state, action) => {
      delete state.byId[action.meta.arg];
      state.allIds = state.allIds.filter((id) => id !== action.meta.arg);
    });

    builder.addCase(getSessions.fulfilled, (state, action) => {

      if (action.payload) {
        const newState = {
          byId: {},
          allIds: [],
        } as SessionState;
        action.payload.forEach((session: Session) => {
          newState.byId[session.id] = {
            ...session,
            complete: !!session.complete,
          };
          newState.allIds.push(session.id);
        })
        return newState;
      }
    });
    // Update session - only executes at END GAME
    builder.addCase(updateSession.fulfilled, (state, action) => {
      if (action.payload) {
        state.byId[action.payload.id] = action.payload;
      }
    });
  },
})

export const { 


} = sessionSlice.actions;

export default sessionSlice.reducer;