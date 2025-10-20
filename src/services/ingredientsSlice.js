import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getIngredients from "../api/getIngredients";

const initialState = {
  items: [],
};

export const fetchAllIngredients = createAsyncThunk(
  "ingredients/fetchAll",
  async () => {
    try {
      const response = await getIngredients();
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch ingredients");
    }
  }
);

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    incrementCount(state, action) {
      state.items.forEach((item) => {
        if (item._id === action.payload._id && item.type !== "bun") {
          item.count = item.count || 0;
          item.count += 1;
        }
      });
    },
    decrementCount(state, action) {
      state.items.forEach((item) => {
        if (item._id === action.payload._id && item.type !== "bun") {
          item.count = item.count || 0;
          if (item.count > 0) {
            item.count -= 1;
          }
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllIngredients.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export const { incrementCount, decrementCount } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
