import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/productList/ProductListSlice'
import authReducer from '../features/auth/authSlice'
import cartSlice, { removeItemFromCart } from '../features/cart/cartSlice';
import checkOutSlice from '../features/checkOut/checkOutSlice';
export const store = configureStore({
  reducer: {
    products: productReducer,
    auth: authReducer,
    cart: cartSlice,
    checkOut: checkOutSlice,
  },
});
