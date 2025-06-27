/************************* imports *************************/
import {apiSlice} from '../api/apiSlice.js';
import {USERS_URL} from '../../constants/constants.js';

export const usersSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      signUp: builder.mutation({
         query: (data) => ({
            url: `${USERS_URL}/sign-up`,
            method: 'POST',
            body: data
         })
      }),
      signIn: builder.mutation({
         query: (data) => ({
            url: `${USERS_URL}/sign-in`,
            method: 'POST',
            body: data
         })
      }),
      signOut: builder.mutation({
         query: () => ({
            url: `${USERS_URL}/sign-out`,
            method: 'POST'
         })
      }),
      getUserProfile: builder.mutation({
         query: () => ({
            url: `${USERS_URL}/get-user-profile`
         }),
         providesTags: ['Users']
      }),
      updateUserProfile: builder.mutation({
         query: (data) => ({
            url: `${USERS_URL}/update-user-profile`,
            method: 'PUT',
            body: data
         })
      }),
      getAllUsers: builder.mutation({
         query: () => ({
            url: `${USERS_URL}/get-all-users`
         }),
         providesTags: ['Users'],
         keepUnusedDataFor: 5
      }),
      getUser: builder.mutation({
         query: (userId) => ({
            url: `${USERS_URL}/get-user/${userId}`
         }),
         keepUnusedDataFor: 5
      }),
      updateUser: builder.mutation({
         query: (data) => ({
            url: `${USERS_URL}/update-user/${data.userId}`,
            method: 'PUT',
            body: data
         }),
         invalidatesTags: ['User']
      }),
      deleteUser: builder.mutation({
         query: (userId) => ({
            url: `${USERS_URL}/delete-user/${userId}`,
            method: 'DELETE'
         })
      })
   })
});

export const {
   useSignUpMutation,
   useSignInMutation,
   useSignOutMutation,
   useGetUserProfileMutation,
   useUpdateUserProfileMutation,
   useGetAllUsersMutation,
   useGetUserQuery,
   useUpdateUserMutation,
   useDeleteUserMutation
} = usersSlice;