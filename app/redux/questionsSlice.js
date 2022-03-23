import { createSlice } from '@reduxjs/toolkit'

export const questionsSlice = createSlice({
  name: 'questions',
  initialState: {
    categories: []
  },
  reducers: {
    getQuestions: (state, action) => {
      state.categories = action.payload
    },
    addQuestion: (state, action) => {
        state.categories+= 1
      },
    removeQuestion: (state, action) => {
        state.categories+= 1
      },
    editQuestion: (state, action) => {
        state.categories+= 1
      }
  }
})


export const { getQuestions, addQuestion, removeQuestion, editQuestion} = questionsSlice.actions

export default questionsSlice.reducer