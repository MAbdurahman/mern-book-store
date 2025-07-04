import { configureStore } from '@reduxjs/toolkit';
import {apiSlice} from './api/apiSlice.js';
import authSlice from './auth/authSlice.js';


const store = configureStore({
   reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      auth: authSlice,

   },
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
   devTools: true,
});

export default store;