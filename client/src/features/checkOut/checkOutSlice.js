import { createSlice } from "@reduxjs/toolkit";
import { addAddressAsync, addOrder, deleteAddressAsync, fetchAllAddressAsync } from "./checkOutAPI";

const initialState = {
  checkout: [],
  status: "idle",
};

export const checkOutSlice = createSlice({
  name: "checkOut",
  initialState: {
    addresses: [],
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
      })
      .addCase(deleteAddressAsync.fulfilled, (state, action) => {
        state.status = "Success";
        state.addresses = state.addresses.filter(address => address._id !== action.payload);
      });
      
  },
});

export const checkout = (state) => state.checkout;

export const selectAddress = (state) => state.checkOut.addresses;

console.log((state) => state.address);
export default checkOutSlice.reducer;
