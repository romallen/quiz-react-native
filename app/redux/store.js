import { configureStore } from '@reduxjs/toolkit'
import gameReducer from './gameSlice'
import teamsReducer from './teamsSlice'
import questionsReducer from './questionsSlice'

export default configureStore({
  reducer: {
    game: gameReducer,
    teams: teamsReducer,
    questions: questionsReducer
  }
})