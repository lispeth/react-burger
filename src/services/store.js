import { configureStore } from "@reduxjs/toolkit";
import burgerConstructorReducer from "./burgerConstructorSlice";
import ingredientsReducer from "../services/ingredientsSlice";
import ingredientInfoReducer from "../services/ingredientInfoSlice";
import orderReducer from "../services/orderSlice";

export const store = configureStore({
  reducer: {
    burgerConstructor: burgerConstructorReducer,
    ingredients: ingredientsReducer,
    ingredientInfo: ingredientInfoReducer,
    order: orderReducer,
  },
});
