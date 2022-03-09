import { configureStore } from '@reduxjs/toolkit'
import scoreReducer from './scoreSlice'
import teamsReducer from './teamsSlice'
import questionsReducer from './questionsSlice'

export default configureStore({
  reducer: {
    score: scoreReducer,
    teams: teamsReducer,
    questions: questionsReducer
  }
})