import { createSlice } from "@reduxjs/toolkit";
import { addToCartAsync, deleteCartAsync, getCartAsync } from "./cartAPI";


const initialState = {
  // items: [],
  cartItems:[],
  status: "idle",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeItemFromCart: (state, action) => {
      const deletionResponse = action.payload.Data;
      console.log(action.payload.Data);
      console.log(deletionResponse);
      if (deletionResponse.acknowledged) {
        state.cartItems = state.cartItems.filter(item => item._id !== action.meta.arg);
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "Sucess";
        state.cartItems = action.payload;
      })
      .addCase(getCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCartAsync.fulfilled, (state, action) => {
        state.status = "Sucess";
        state.cartItems = action.payload;
      })
      .addCase(deleteCartAsync.fulfilled, (state, action) => {
        state.status = "Success";
        state.cartItems = action.payload.Data; 
      })
  },
});

export const { removeItemFromCart } = cartSlice.actions;

// export const selectCart = (state) => state.cart.items;
export const getCart = (state) => state.cart.cartItems;

export default cartSlice.reducer;
