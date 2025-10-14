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
    setIngredients(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllIngredients.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export const { setIngredients } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
