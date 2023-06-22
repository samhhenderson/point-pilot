//import redux methods
import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit';

//import other
import { PlayerSessionState, PlayerSession } from '../types';
import { executeSqlAsync } from '../db/db-service';

type newPlayerSessionType = {
  playerId: number,
  sessionId: number,
  team: number,
}

export const addPlayerSession = createAsyncThunk(
  'playerSession/addPlayerSession', 
  async (newPlayerSession: newPlayerSessionType, thunkApi) => {
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
    //Because the numpad needs to be very responsive, we update the redux store immediately
    thunkApi.dispatch(updatePlayerSessionState(updatedPlayerSession))
    const query =
    `UPDATE playerSessions
    SET score = ?, bid = ?, team = ?
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
      .catch(error => console.log('GET PLAYER SESSIONS ' + error))
  }
)

export const playerSessionSlice = createSlice({
  name: 'playerSession',
  initialState: {
    tempById: {},
    byId: {},
    allIds: [],
  } as PlayerSessionState,
  reducers: {
    updatePlayerSessionState: (state, action) => {
      state.byId[action.payload.id] = action.payload;
    },
    setTempPlayerSession: (state, action) => {
      state.tempById[action.payload.id] = action.payload;
    },
    deleteTempPlayerSession: (state, action) => {
      delete state.tempById[action.payload];
    },
    clearTempPlayerSessions: (state) => {
      state.tempById = {};
    },
    changeTempPlayerSessionTeam: (state, action) => {
      const tempSession = state.tempById[action.payload];
      if (tempSession) {
        tempSession.team === 9 ? tempSession.team = 1 : tempSession.team++;
      }
    },
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
    });
    
  },
})

export const { 
  setTempPlayerSession,
  deleteTempPlayerSession,
  clearTempPlayerSessions,
  changeTempPlayerSessionTeam,
  updatePlayerSessionState,
} = playerSessionSlice.actions;

export default playerSessionSlice.reducer;