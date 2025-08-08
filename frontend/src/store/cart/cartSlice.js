import creatSlice, {createSlice} from '@reduxjs/toolkit';
import {updateCart} from '../../utils/functionsUtils.js';

const initialState = localStorage.getItem('eBook_Store_Cart')
   ? JSON.parse(localStorage.getItem('eBook_Store_Cart'))
   : {orderItems: [], shippingAddress: {}, paymentMethod: 'PayPal'};

const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addToCart: (state, action) => {
      },
      removeFromCart: (state, action) => {
      },
      saveShippingAddress: (state, action) => {
      },
      savePaymentMethod: (state, action) => {
      },
      clearOrderItems: (state, action) => {
      },
      resetCart: (state) => {
      }
   }
});

export const {
   addToCart,
   removeFromCart,
   saveShippingAddress,
   savePaymentMethod,
   clearOrderItems,
   resetCart
} = cartSlice.actions;

export default cartSlice.reducer;