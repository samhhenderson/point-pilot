import { configureStore } from '@reduxjs/toolkit'
import activePlayerReducer from './activePlayerSlice'
import viewReducer from './viewSlice'

export default configureStore({ 
  reducer: {
    activePlayer: activePlayerReducer,
    view: viewReducer
  }
})