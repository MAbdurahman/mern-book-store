import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   userInfo: localStorage.getItem('eBookStore')
      ? JSON.parse(localStorage.getItem('eBookStore'))
      : null,
};

const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      setCredentials: (state, action) => {
         state.userInfo = action.payload;
         localStorage.setItem('eBookStore', JSON.stringify(action.payload));
      },
      signOut: (state, action) => {
         state.userInfo = null;
         localStorage.clear();
      }
   }
});

export const { setCredentials, signOut } = authSlice.actions;
export default authSlice.reducer;