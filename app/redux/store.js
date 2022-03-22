import { configureStore } from '@reduxjs/toolkit'
import gameSettingsReducer from './gameSettingsSlice'
import teamsReducer from './teamsSlice'
import questionsReducer from './questionsSlice'

export default configureStore({
  reducer: {
    gameSettings: gameSettingsReducer,
    teams: teamsReducer,
    questions: questionsReducer
  }
})