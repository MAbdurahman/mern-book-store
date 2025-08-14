import {apiSlice} from '../api/apiSlice.js';
import {ORDERS_URL, PAYPAL_URL} from '../../constants/constants.js';

export const orderSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      creatOrder: builder.mutation({
         query: (order) => ({
            url: ORDERS_URL,
            method: 'POST',
            body: order
         })
      }),
      getOrderDetails: builder.query({
         query: (orderId) => ({
            url: `${ORDERS_URL}/${orderId}`
         }),
         keepUnusedDataFor: 5
      }),
      payOrder: builder.mutation({
         query: ({orderId, details}) => ({
            url: `${ORDERS_URL}/${orderId}/pay`,
            method: 'PUT',
            body: details
         })
      }),
      getPaypalClientId: builder.query({
         query: () => ({
            url: PAYPAL_URL
         }),
         keepUnusedDataFor: 5
      }),
      getUserOrder: builder.query({
         query: () => ({
            url: `${ORDERS_URL}/user`
         }),
         keepUnusedDataFor: 5
      }),
      getAllOrders: builder.query({
         query: () => ({
            url: ORDERS_URL
         }),
         keepUnusedDataFor: 5
      }),
      deliveredOrder: builder.mutation({
         query: (orderId) => ({
            url: `${ORDERS_URL}/${orderId}/delivered`,
            method: 'PUT'
         })
      })
   })
});

export const {
   useCreateOrderMutation,
   useGetOrderDetailsQuery,
   usePayOrderMutation,
   useGetPayPalClientIdQuery,
   useGetUserOrderQuery,
   useDeliveredOrderMutation,
   useGetAllOrdersQuery
} = orderSlice;