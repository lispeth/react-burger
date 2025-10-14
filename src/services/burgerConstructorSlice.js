import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    ingredients: []
}

export const burgerConstructorSlice = createSlice({
    name: 'burgerConstructor',
    initialState,
    reducers: {
        addComponentToConstructor(state, action) {
            state.ingredients.push(action.payload);
        },
        removeComponent(state, action) {
            state.ingredients = state.ingredients.filter((_, index) => index !== action.payload);
        },
    }
})

export default burgerConstructorSlice.reducer;
export const { addComponentToConstructor, removeComponent } = burgerConstructorSlice.actions;
