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


export const { addQuestion, removeQuestion, editQuestion} = questionsSlice.actions

export default questionsSlice.reducer