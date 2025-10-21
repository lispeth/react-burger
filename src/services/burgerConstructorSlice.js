import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bun: null,
  ingredients: [],
};

export const burgerConstructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    addComponentToConstructor(state, action) {
      if (action.payload.type === "bun") {
        state.bun = action.payload;
        return;
      }
      state.ingredients.push(action.payload);
    },
    removeComponentFromConstructor(state, action) {
      const ingredientIdx = state.ingredients.findIndex(
        (item) => item._id === action.payload._id
      );
      if (ingredientIdx !== -1) {
        state.ingredients.splice(ingredientIdx, 1);
      }
    },
    updateIngredientsPosition: (state, action) => {
      state.ingredients = action.payload;
    },
  },
});

export default burgerConstructorSlice.reducer;
export const {
  addComponentToConstructor,
  removeComponentFromConstructor,
  updateIngredientsPosition,
} = burgerConstructorSlice.actions;
