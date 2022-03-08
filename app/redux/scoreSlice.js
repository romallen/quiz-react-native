import { createSlice } from '@reduxjs/toolkit'

export const scoreSlice = createSlice({
  name: 'score',
  initialState: {
    value: {}
  },
  reducers: {
 
    incrementScore: (state, action) => {
      state.value += action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { incrementScore } = scoreSlice.actions

export default scoreSlice.reducer