import { configureStore } from '@reduxjs/toolkit';
import playerDisplayReducer from './components/playerDisplaySlice';
import modalsReducer from './modals/modalsSlice';
import gameReducer from './views/gameSlice';

export default configureStore({ 
  reducer: {
    playerDisplay: playerDisplayReducer,
    modals: modalsReducer,
    game: gameReducer
  }
})