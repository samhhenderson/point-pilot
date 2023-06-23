import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './playerSlice';
import modalsReducer from './modalsSlice';
import gameReducer from './gameSlice';
import sessionReducer from './sessionSlice';
import playerSessionReducer from './playerSessionSlice';
import settingReducer from './settingSlice';

export default configureStore({ 
  reducer: {
    player: playerReducer,
    modals: modalsReducer,
    game: gameReducer,
    session: sessionReducer,
    playerSession: playerSessionReducer,
    setting: settingReducer,
  }
})