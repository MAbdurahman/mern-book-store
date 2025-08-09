import { configureStore } from '@reduxjs/toolkit';
import {apiSlice} from './api/apiSlice.js';
import authReducer from './auth/authSlice.js';
import cartReducer from './cart/cartSlice.js';


const store = configureStore({
   reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      auth: authReducer,
      cart: cartReducer

   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
   devTools: true,
});

export default store;