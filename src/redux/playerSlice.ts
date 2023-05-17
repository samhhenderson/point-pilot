import { createSlice } from '@reduxjs/toolkit'

interface player {
  name: string,
  score: number,
}

interface state {
  players: player[],
}

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    players: [{name: 'Same', score: 0}]
  },
  reducers: {
    add: (state: state, action) => {
      state.players.push(action.payload);
    }
  }
})

export const { add } = playerSlice.actions;
export default playerSlice.reducer;