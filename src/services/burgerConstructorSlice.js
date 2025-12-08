import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

const initialState = {
  bun: null,
  ingredients: [],
};

export const burgerConstructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    addComponentToConstructor: {
      reducer: (state, action) => {
        if (action.payload.type === "bun") {
          state.bun = action.payload;
          return;
        }
        state.ingredients.push(action.payload);
      },
      prepare: (ingredients) => {
        const uniqueId = uuid();
        return { payload: { ...ingredients, uniqueId} };
      },
    },
    removeComponentFromConstructor(state, action) {
      const ingredientIdx = state.ingredients.findIndex(
        (item) => item.uniqueId === action.payload.uniqueId
      );
      if (ingredientIdx !== -1) {
        state.ingredients.splice(ingredientIdx, 1);
      }
    },
    updateIngredientsPosition: (state, action) => {
      state.ingredients = action.payload;
    },
    resetBurgerConstructor(state) {
      state.bun = null;
      state.ingredients = [];
    },
  },
});

export default burgerConstructorSlice.reducer;
export const {
  addComponentToConstructor,
  removeComponentFromConstructor,
  updateIngredientsPosition,
  resetBurgerConstructor,
} = burgerConstructorSlice.actions;
