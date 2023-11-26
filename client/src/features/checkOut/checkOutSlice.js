import { createSlice } from "@reduxjs/toolkit";
import { addAddressAsync, addOrder, deleteAddressAsync, fetchAllAddressAsync, findOrderAsync } from "./checkOutAPI";

const initialState = {
  checkout: [],
  status: "idle",
  orders: [], 
};

export const checkOutSlice = createSlice({
  name: "checkOut",
  initialState: {
    addresses: [],
    orders: [], 
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAddressAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllAddressAsync.fulfilled, (state, action) => {
        state.status = "Sucess";
        state.addresses = action.payload;
      })
      .addCase(addAddressAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addAddressAsync.fulfilled, (state, action) => {
        state.status = "Sucess";
        state.addresses = action.payload;
      })
      .addCase(addOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.status = "Sucess";
        state.checkout = action.payload;
        state.orders = action.payload?._id;

      })
      .addCase(deleteAddressAsync.fulfilled, (state, action) => {
        state.status = "Success";
        state.addresses = state.addresses.filter(address => address._id !== action.payload);
      })
      // .addCase(findOrderAsync.pending, (state) => {
      //   state.status = "loading";
      // })
      // .addCase(findOrderAsync.fulfilled, (state, action) => {
      //   state.status = "Sucess";
      //   state.checkout = action.payload;
      //   state.orders = action.payload?.orderID;
      // });
      
  },
});

export const checkout = (state) => state.checkout;
export const getOrders = (state) => state.checkOut.orders;

export const selectAddress = (state) => state.checkOut.addresses;

console.log((state) => state.address);
export default checkOutSlice.reducer;
