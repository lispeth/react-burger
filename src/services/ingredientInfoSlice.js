import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedIngredient: null,
};

export const ingredientInfoSlice = createSlice({
  name: "ingredientInfo",
  initialState,
  reducers: {
    addSelectedIngredient: (state, action) => {
      state.ingredient = action.payload;
    },
    removeSelectedIngredient: (state) => {
      state.ingredient = null;
    },
  },
});

export default ingredientInfoSlice.reducer;
export const { addSelectedIngredient, removeSelectedIngredient } =
  ingredientInfoSlice.actions;
