import { configureStore } from '@reduxjs/toolkit'
import playerDisplayReducer from '../components/playerDisplaySlice'
import modalsReducer from '../modals/modalsSlice'

export default configureStore({ 
  reducer: {
    playerDisplay: playerDisplayReducer,
    modals: modalsReducer
  }
})