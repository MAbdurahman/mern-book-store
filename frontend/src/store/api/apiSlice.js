import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import {BASE_URL} from '../../constants/constants.js';




const baseQuery = fetchBaseQuery({
   baseUrl: BASE_URL,
});

async function baseQueryWithAuth(args, api, extra) {
   const result = await baseQuery(args, api, extra);

   if (result.error && result.status === 401) {
      console.log('login error', result.error);
      return null;
   }

   return result;
}

export const apiSlice = createApi({
   baseQuery: baseQueryWithAuth,
   tagTypes: ['Product', 'User'],
   endpoints: (builder) => ({}),
});