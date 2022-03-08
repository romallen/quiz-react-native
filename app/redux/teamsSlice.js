import { createSlice } from '@reduxjs/toolkit'

export const teamsSlice = createSlice({
  name: 'teams',
  initialState: {
    value: {}
  },
  reducers: {
 
    createTeams: (state, action) => {
        console.log("action.payload",action)
      for(let i=0; i< action.payload;i++){
        state.value["Team " + (i+1)+ ":"] = 0
         // state.value.push("Team " + (i+1)+ ": ")
      }
    },
    incrementScore: (state, action) => {
      state.value["Team " + (action.payload.team)+ ":"] += action.payload.points
    },
  }
})

// Action creators are generated for each case reducer function
export const { createTeams, incrementScore } = teamsSlice.actions

export default teamsSlice.reducer