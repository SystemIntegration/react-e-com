import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";

const initialState = {
    cartItems: [],
    qty: 0,
}

const cartValue = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const findIndex = state.cartItems.findIndex((item) => { return (item.id === action.payload.id) });
            if (findIndex >= 0) {
                state.cartItems[findIndex].qty += 1;
            } else {
                const tempValue = { ...action.payload, qty: 1 }
                state.cartItems.push(tempValue)
            }
        },
        removeFromCart: (state, action) => {
            const findIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
            if (findIndex >= 0) {
                if (state.cartItems[findIndex].qty > 1) {
                    state.cartItems[findIndex].qty -= 1;
                } else {
                    state.cartItems.splice(findIndex, 1);
                }
            }
        },
    },
})

export const { addToCart, removeFromCart } = cartValue.actions;
export default cartValue.reducer;






