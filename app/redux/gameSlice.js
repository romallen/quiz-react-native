import { createSlice } from '@reduxjs/toolkit'

export const gameSlice = createSlice({
  name: 'score',
  initialState: {
    turn: 0,
    cardState: []
  },
  reducers: {
   incrementTurn: (state, action) => {
        state.turn+= 1
      },
    gameState: (state, action) => {
      state.cardState = action.payload
      console.log(state)
    }

  }
})

// Action creators are generated for each case reducer function
export const { incrementTurn,gameState } = gameSlice.actions

export default gameSlice.reducer