import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import getIngredients from "../api/getIngredients";

const initialState = {
  items: [],
};

export const fetchAllIngredients = createAsyncThunk(
  "ingredients/fetchAll",
  async () => {
    const response = await getIngredients();
    return response.data;
  }
);

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchAllIngredients.fulfilled, (state, action) => {
      state.items = action.payload;
    });
    builder.addCase(fetchAllIngredients.rejected, (state) => {
      // TODO: обработать ошибку
      state.items = [];
    });
  },
});


export default ingredientsSlice.reducer;
