import { createSlice } from "@reduxjs/toolkit";
import data from "../data";

export const gameSettingsSlice = createSlice({
  name: "gameSettings",
  initialState: {
    numCategoriesStore: 0,
    numQuestionsStore: 0,
    timer: null,
    gameboard: data,
    cardState: [],
  },
  reducers: {
    gameState: (state, action) => {
      state.cardState = action.payload;
    },
    numCategoriesStore: (state, action) => {
      state.numCategoriesStore = action.payload;
    },
    numQuestionsStore: (state, action) => {
      state.numQuestionsStore = action.payload;
    },
    clearBoard: (state, action) => {
      state.gameboard = [];
      state.gameboard = action.payload;
    },

    makeGameboardCat: (state, action) => {
      state.gameboard[action.payload.index].category = action.payload.value;
    },
    makeGameboardQues: (state, action) => {
      state.gameboard[action.payload.index].questions.push(
        action.payload.value
      );
    },
  },
});

export const {
  gameState,
  numCategoriesStore,
  numQuestionsStore,
  clearBoard,
  makeGameboardCat,
  makeGameboardQues,
} = gameSettingsSlice.actions;

export default gameSettingsSlice.reducer;
