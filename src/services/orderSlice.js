import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    orderNumber: 0
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setOrderNumber(state, action) {
            state.orderNumber = action.payload;
        }
    }
})

export default orderSlice.reducer;
export const { setOrderNumber } = orderSlice.actions;
