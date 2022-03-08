import { configureStore } from '@reduxjs/toolkit'
import scoreReducer from './scoreSlice'
import teamsReducer from './teamsSlice'

export default configureStore({
  reducer: {
    score: scoreReducer,
    teams: teamsReducer
  }
})