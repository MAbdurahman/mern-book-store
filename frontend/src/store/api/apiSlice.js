import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import {BASE_URL} from '../../constants/constants.js';
import {signOut} from '../auth/authSlice.js';


const baseQuery = fetchBaseQuery({
   baseUrl: BASE_URL,
});

async function baseQueryWithAuth(args, api, extra) {
   const result = await baseQuery(args, api, extra);

   if (result.error && result.status === 401) {
      api.dispatch(signOut());
   }

   return result;
}

export const apiSlice = createApi({
   baseQuery: baseQueryWithAuth,
   tagTypes: ['Order', 'Product', 'User'],
   endpoints: (builder) => ({}),
});