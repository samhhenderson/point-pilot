import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Player, PlayerState } from '../types';
import { db, executeSqlAsync } from '../db/db-service';
import { Query } from 'expo-sqlite';

export const addPlayer = createAsyncThunk(
  'player/addPlayer', 
  async (newPlayer: string, thunkApi) => {
    const query = 
    `INSERT INTO Players (name)
    VALUES (?)`
    return executeSqlAsync(query, [newPlayer])
      .then(response => console.log('INSERT', response))
      .catch(error => console.log('INSERT ' + error))
  }
)

export const deletePlayer = createAsyncThunk(
  'player/deletePlayer', 
  async (deletedPlayer: string, thunkApi) => {
    const query = 
    `DELETE FROM Players
    WHERE name = ?`
    return executeSqlAsync(query, [deletedPlayer])
      .then(response => console.log('DELETE Success'))
      .catch(error => console.log('DELETE ' + error))
  }
)

export const getPlayers = createAsyncThunk(
  'player/getPlayers',
  async (thunkApi) => {
    const query = `SELECT * FROM Players`;
    return executeSqlAsync(query, [])
      .then(response => response.rows._array)
      .catch(error => console.log('GET PLAYERS ' + error))
  }
)


export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    playerList: {}
  } as PlayerState,
  reducers: {
    changeActivePlayer: (state, action) => {
      state.playerList[action.payload].active === 1 ? 
        state.playerList[action.payload].active = 0 : 
        state.playerList[action.payload].active = 1;
    },
    changeScore: (state, action) => {
      const { playerName, scoreToAdd, isBid } = action.payload;
      const player = state.playerList[playerName];
      if (player && !isBid) player.score += scoreToAdd;
      else if (player) player.bid += scoreToAdd;
    },
    changeTeam: (state, action) => {
      const player = state.playerList[action.payload];
      if (player) player.team === 9? player.team = 0 : player.team++;
    },
    calculatePlaces: state => {
      const activePlayers: Player[] = [];
      for (const player in state.playerList) {
        if (state.playerList[player].active) {
          activePlayers.push(state.playerList[player]);
        }
      }
      activePlayers.sort((a, b) => b.score - a.score);
      let currentPlace = 1;
      activePlayers.forEach((player, i) => {
        if (i === 0) player.place = currentPlace;
        else if (player.score === activePlayers[i - 1].score) {
          player.place = currentPlace;
        } else {
          currentPlace++;
          player.place = currentPlace;
        }
      })
    }
  },
  extraReducers: builder => {
    builder.addCase(addPlayer.fulfilled, (state, action) => {
      if (!state.playerList[action.meta.arg]) {
        state.playerList[action.meta.arg] = Player(action.meta.arg);
      }
    });
    builder.addCase(deletePlayer.fulfilled, (state, action) => {
      delete state.playerList[action.meta.arg];
    });
    builder.addCase(getPlayers.fulfilled, (state, action) => {
      if (action.payload) {action.payload.forEach((player: Player) => {
        state.playerList[player.name] = player;
        })
      }
    });
  }
})

export const { 
  changeActivePlayer, 
  changeScore,
  changeTeam,
  calculatePlaces,
} = playerSlice.actions;
export default playerSlice.reducer;