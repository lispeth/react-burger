import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getOrder } from "../api/getOrder";

const initialState = {
  orderNumber: null,
  orderRequest: false,
  orderFailed: false,
};

export const getOrderDetails = createAsyncThunk(
  "order/orderDetails",
  async (ingredients) => {
    try {
      const response = await getOrder(ingredients);
      return response;
    } catch (error) {
      throw new Error("Failed to fetch order details");
    }
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
    builder.addCase(getOrderDetails.pending, (state) => {
      state.orderRequest = true;
      state.orderFailed = false;
    });
    builder.addCase(getOrderDetails.fulfilled, (state, action) => {
      state.orderRequest = false;
      state.orderNumber = action.payload;
    });
    builder.addCase(getOrderDetails.rejected, (state) => {
      state.orderRequest = false;
      state.orderFailed = true;
    });
  },
});

export default orderSlice.reducer;
export const { setOrderNumber, resetOrder } = orderSlice.actions;
