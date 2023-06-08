import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './views/playerSlice';
import modalsReducer from './modals/modalsSlice';
import gameReducer from './views/gameSlice';

export default configureStore({ 
  reducer: {
    player: playerReducer,
    modals: modalsReducer,
    game: gameReducer
  }
})