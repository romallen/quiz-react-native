import { createSlice } from '@reduxjs/toolkit'

export const gameSlice = createSlice({
  name: 'score',
  initialState: {
    value: 0
  },
  reducers: {
   incrementTurn: (state, action) => {
        state.value+= 1
      }
  }
})

// Action creators are generated for each case reducer function
export const { incrementTurn } = gameSlice.actions

export default gameSlice.reducer