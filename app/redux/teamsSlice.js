import { createSlice } from "@reduxjs/toolkit";

export const teamsSlice = createSlice({
  name: "teams",
  initialState: {
    value: {},
    turn: 0,
  },
  reducers: {
    createTeams: (state, action) => {
      for (let i = 0; i < action.payload; i++) {
        state.value["Team " + (i + 1)] = 0;
      }
    },
    incrementScore: (state, action) => {
      state.value["Team " + action.payload.team] += action.payload.points;
    },
    incrementTurn: (state, action) => {
      state.turn += 1;
    },
  },
});

export const { createTeams, incrementScore, incrementTurn } =
  teamsSlice.actions;

export default teamsSlice.reducer;
