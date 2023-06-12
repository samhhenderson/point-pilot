import { createSlice } from '@reduxjs/toolkit'
import { PlayerState } from '../types';

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    playerList: [
      {name: 'Sam', active: true, score: 0, bid: 0, team: 0, place: 0,}, 
      {name: 'Emily', active: true, score: 0, bid: 0, team: 0, place: 0,},
      {name: 'Kevin', active: false, score: 0, bid: 0, team: 0, place: 0,}, 
      {name: 'Julia', active: false, score: 0, bid: 0, team: 0, place: 0,},
    ],
  } as PlayerState,
  reducers: {
    addPlayer: (state, action) => {
      //double check that the new player is unique
      if (!state.playerList.some(player => player.name === action.payload.name)) {
        state.playerList.push({
          name: action.payload.name, 
          active: false, 
          score: 0,
          bid: 0,
          team: 0,
          place: 0,
        });
      }
    },
    deletePlayer: (state, action) => {
      const index = state.playerList.findIndex((p) => p.name === action.payload);
      state.playerList.splice(index, 1);
    },
    changeActivePlayer: (state, action) => {
      const player = state.playerList.find((p) => p.name === action.payload);
      if (player) player.active = !player.active;
    },
    changeScore: (state, action) => {
      const { playerName, scoreToAdd, isBid } = action.payload;
      const player = state.playerList.find((p) => p.name === playerName);
      if (player && !isBid) player.score += scoreToAdd;
      else if (player) player.bid += scoreToAdd;
    },
    changeTeam: (state, action) => {
      const player = state.playerList.find((p) => p.name === action.payload);
      if (player) player.team === 9? player.team = 0 : player.team++;
    },
    calculatePlaces: state => {
      state.playerList.sort((a, b) => b.score - a.score);
      let currentPlace = 1;
      state.playerList.every((player, i) => {
        if (!player.active) return false;
        if (i === 0) player.place = currentPlace;
        else if (player.score === state.playerList[i - 1].score) {
          player.place = currentPlace;
        } else {
          currentPlace++;
          player.place = currentPlace;
        }
        return true;
      })
    }
  }
})

export const { 
  addPlayer, 
  deletePlayer,
  changeActivePlayer, 
  changeScore,
  changeTeam,
  calculatePlaces,
} = playerSlice.actions;
export default playerSlice.reducer;