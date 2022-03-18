import { createSlice } from '@reduxjs/toolkit'

export const teamsSlice = createSlice({
  name: 'teams',
  initialState: {
    value: {}
  },
  reducers: {
 
    createTeams: (state, action) => {

      for(let i=0; i< action.payload;i++){
        state.value["Team " + (i+1)+ ":"] = 0
      }
    },
    incrementScore: (state, action) => {
      state.value["Team " + (action.payload.team)+ ":"] += action.payload.points
    },
  }
})


export const { createTeams, incrementScore } = teamsSlice.actions

export default teamsSlice.reducer