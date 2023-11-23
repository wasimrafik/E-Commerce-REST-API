import { createSlice } from "@reduxjs/toolkit";
import {  fetchAllProductsAsync, fetchSingleProduct } from "./ProductListAPI";

const initialState = {
  products: [],
  status: "idle",
};

// export const fetchAllProductsAsync = createAsyncThunk(
//   "products/fetchAllProducts",
//   async () => {
//     const response = await fetchAllProducts();
//     return response.data;
//   }
// );


// export const fetchProductsByFilterAsync = createAsyncThunk(
//   "products/fetchProductsByFilter",
//   async (filter) => {
//     const response = await fetchProductsByFilter();
//     return response.data;
//   }
// );

export const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchSingleProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      // .addCase(fetchProductsByFilterAsync.pending, (state) => {
      //   state.status = "loading";
      // })
      // .addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
      //   state.status = "idle";
      //   state.products = action.payload;
      // });
  },
});

// export const { increment } = ProductSlice.actions;

export const selectAllProducts = (state) => state.products.products;

export const selectSingleProducts = (state) => state.products
export default ProductSlice.reducer;
