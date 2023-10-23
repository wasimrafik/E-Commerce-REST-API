import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/productList/ProductListSlice'
export const store = configureStore({
  reducer: {
    products: productReducer,
  },
});
