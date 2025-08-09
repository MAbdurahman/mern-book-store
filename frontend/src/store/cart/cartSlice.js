import {createSlice} from '@reduxjs/toolkit';
import {updateCart} from '../../utils/functionsUtils.js';

const initialState = localStorage.getItem('eBook_Store_Cart')
   ? JSON.parse(localStorage.getItem('eBook_Store_Cart'))
   : {orderItems: [], shippingAddress: {}, paymentMethod: 'PayPal'};

const cartSlice = createSlice({
   name: 'cart',
   initialState,
   reducers: {
      addToCart: (state, action) => {
         const {user, rating, numberOfReviews, reviews, ...item} = action.payload;
         const existingItem = state.orderItems.find((product) => product._id === item._id);

         if (existingItem) {
            state.orderItems = state.orderItems.map((product) => product._id === existingItem._id ? item : product)

         } else {
            state.orderItems = [...state.orderItems, item];
         }
         return updateCart(state, item);
      },
      removeFromCart: (state, action) => {
         state.orderItems = state.orderItems.filter((product) => product._id === action.payload._id);
         return updateCart(state);
      },
      saveShippingAddress: (state, action) => {
         state.shippingAddress = action.payload;
         localStorage.setItem('eBook_Store_Cart', JSON.stringify(state));
      },
      savePaymentMethod: (state, action) => {
         state.paymentMethod = action.payload;
         localStorage.setItem('eBook_Store_Cart', JSON.stringify(state));
      },
      clearOrderItems: (state, action) => {
         state.orderItems = [];
         localStorage.setItem('eBook_Store_Cart', JSON.stringify(state));
      },
      resetCart: (state) => (state = initialState),
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