import { createSlice } from '@reduxjs/toolkit'

export const gameSettingsSlice = createSlice({
  name: 'gameSettings',
  initialState: {
    numCategoriesStore: 0,
    numQuestionsStore: 0,
    timer: null,
    cardState: []
  },
  reducers: {
   
    gameState: (state, action) => {
      state.cardState = action.payload
      console.log(state)
    },
    numCategoriesStore: (state, action) => {
      state.numCategoriesStore = action.payload
    },
    numQuestionsStore: (state, action) => {
      state.numQuestionsStore = action.payload
    }

  }
})


export const { gameState, numCategoriesStore, numQuestionsStore } = gameSettingsSlice.actions

export default gameSettingsSlice.reducer