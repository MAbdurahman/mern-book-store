import React, {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import {useSignOutMutation} from '../store/users/usersSlice.js';
import {signOut} from '../store/auth/authSlice.js';
import {
   FaShoppingCart,
   FaUser,
   FaChevronDown,
   FaSignOutAlt,
   FaBars,
   FaTimes,
} from "react-icons/fa";


export default function HeaderComponent() {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const {userInfo} = useSelector((state) => state.auth);
   const [signOutApiCall] = useSignOutMutation();

   const [openMenu, setOpenMenu] = useState(false);
   const [openAdminMenu, setOpenAdminMenu] = useState(false);


  async function signOutHandler() {
     console.log('signOutHandler');
     try {
     await signOutApiCall().unwrap();
     dispatch(signOut());
     navigate('/sign-in');

     } catch(err) {
        console.log(`Error: ${err.message}`);

     }
  }

   return (
      <div>
         <h2>HeaderComponent</h2>
      </div>

   );
}