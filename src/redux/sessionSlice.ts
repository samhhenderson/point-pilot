//import redux methods
import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit';

//import other
import { SessionState, Session } from '../types';
import { executeSqlAsync } from '../db/db-service';


export const addSession = createAsyncThunk(
  'session/addSession', 
  async (session: Session, thunkApi) => {
    const query = 
    `INSERT INTO sessions (date, gameId, complete)
    VALUES (?, ?, ?, ?)
    RETURNING *;`
    return executeSqlAsync(query, [
      session.date, 
      session.gameId, 
      session.complete, 
    ])
    .then((response): Session => response.rows._array[0])
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
  async (updatedSession: Session, thunkApi) => {
    const query =
    `UPDATE sessions
    SET date = ?, complete = ?
    WHERE id = ?`
    return executeSqlAsync(query, [
      updatedSession.date,
      updatedSession.complete,
      updatedSession.id
    ])
    .then((response): Session => response.rows._array[0])
    .catch(error => console.log('UPDATE ' + error))
  }
)

export const getSessions = createAsyncThunk(
  'session/getSessions',
  async (thunkApi) => {
    const query = `SELECT * FROM sessions`;
    return executeSqlAsync(query, [])
      .then(response => response.rows._array)
      .catch(error => console.log('GET GAMES ' + error))
  }
)

export const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    activeSession: {date: '', gameId: 0, complete: 0},
    byId: {},
    allIds: [],
  } as SessionState,
  reducers: {

  },
  extraReducers: (builder) => {
    // Add new session - only executes at PLAY!
    builder.addCase(addSession.fulfilled, (state, action) => {
      if (action.payload) {
        state.byId[action.payload.id] = action.payload;
        state.allIds.push(action.payload.id);
      }
    });
    // Delete and update session - will be needed when HISTORY is implemented
    builder.addCase(deleteSession.fulfilled, (state, action) => {
      delete state.byId[action.meta.arg];
      state.allIds = state.allIds.filter((id) => id !== action.meta.arg);
    });

    builder.addCase(getSessions.fulfilled, (state, action) => {
      if (action.payload) {
        action.payload.forEach((session: Session) => {
          state.byId[session.id] = session;
          state.allIds.push(session.id);
        })
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