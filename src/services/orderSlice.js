import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getOrder } from "../api/getOrder";

const initialState = {
  orderNumber: null,
  orderRequest: false,
  orderFailed: false,
};

export const getOrderNumber = createAsyncThunk(
  "order/orderDetails",
  async (ingredients) => {
    const response = await getOrder(ingredients);
    return response.order.number;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.orderNumber = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOrderNumber.pending, (state) => {
      state.orderRequest = true;
      state.orderFailed = false;
    });
    builder.addCase(getOrderNumber.fulfilled, (state, action) => {
      state.orderRequest = false;
      state.orderNumber = action.payload;
    });
    builder.addCase(getOrderNumber.rejected, (state) => {
      state.orderRequest = false;
      state.orderFailed = true;
    });
  },
});

export default orderSlice.reducer;
export const { setOrderNumber, resetOrder } = orderSlice.actions;
