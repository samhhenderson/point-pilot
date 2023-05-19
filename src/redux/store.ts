import { configureStore } from '@reduxjs/toolkit'
import activePlayerReducer from './activePlayerSlice'

export default configureStore({ 
  reducer: {
    activePlayer: activePlayerReducer
  }
})