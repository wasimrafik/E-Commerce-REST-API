import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productReducer from '../features/productList/ProductListSlice'
import authReducer from '../features/auth/authSlice'
import cartSlice, { removeItemFromCart } from '../features/cart/cartSlice';
import checkOutSlice from '../features/checkOut/checkOutSlice';
import profilePageSlice from '../features/userProfilePage/profilePageSlice';


const persistConfig = {
  key: 'root',
  storage,
  whitelist:['cart', 'profilePage', 'checkOut', 'products']
}

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    products: productReducer,
    auth: authReducer,
    cart: cartSlice,
    checkOut: checkOutSlice,
    profilePage: profilePageSlice,
  }));

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };





