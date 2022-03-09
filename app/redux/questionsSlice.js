import { createSlice } from '@reduxjs/toolkit'

export const questionsSlice = createSlice({
  name: 'questions',
  initialState: {
    value: []
  },
  reducers: {
    addQuestion: (state, action) => {
        state.value+= 1
      },
    removeQuestion: (state, action) => {
        state.value+= 1
      },
    editQuestion: (state, action) => {
        state.value+= 1
      }
  }
})

// Action creators are generated for each case reducer function
export const { addQuestion, removeQuestion, editQuestion} = questionsSlice.actions

export default questionsSlice.reducer