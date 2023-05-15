import { configureStore } from "@reduxjs/toolkit";
import cartValue from "./redux/cartValue";

const store = configureStore({
    reducer: {
        cart: cartValue,
    }
});

export default store;