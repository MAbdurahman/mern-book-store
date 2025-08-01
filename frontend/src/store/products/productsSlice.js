/************************* imports *************************/
import {PRODUCT_URL} from '../../constants/constants.js';
import {apiSlice} from '../api/apiSlice.js';

export const productsSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      getAllProducts: builder.query({
         query: ({keyword, pageNumber}) => ({
            url: `${PRODUCT_URL}`
         }),
         keepUnusedDataFor: 5
      }),
      getSingleProduct: builder.query({
         query: (productId) => ({
            url: `${PRODUCT_URL}/${productId}`,
         }),
         keepUnusedDataFor: 5,
      }),
      createProduct: builder.mutation({
         query: () => ({
            url: PRODUCT_URL,
            method: 'POST',
         }),
         invalidatesTags: ['Product']
      }),
      updateProduct: builder.mutation({
         query: (data) => ({
            url: `${PRODUCT_URL}/${data.productId}`,
            method: 'PUT',
            body: data
         }),
         invalidatesTags: ['Product']
      }),
      deleteProduct: builder.mutation({
         query: (productId) => ({
            url: `${PRODUCT_URL}/${productId}`,
            method: 'DELETE',
         }),
         providesTags: ['Product']
      }),
      createProductReview: builder.mutation({
         query: (data) => ({
            url: `${PRODUCT_URL}/${data.productId}/reviews`,
            method: 'POST',
            body: data
         }),
         invalidatesTags: ['Product']
      })
   })
});

export const {
   useGetAllProductsQuery,
   useGetSingleProductQuery,
   useCreateProductMutation,
   useUpdateProductMutation,
   useDeleteProductMutation,
   useCreateProductReviewMutation,
} = productsSlice;