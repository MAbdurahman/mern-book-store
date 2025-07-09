import React, {useState} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {useSignOutMutation} from '../store/users/usersSlice.js';
import {signOut} from '../store/auth/authSlice.js';
import {getFirstName} from '../utils/functionsUtils.js';
import {
   FaShoppingCart,
   FaUser,
   FaChevronDown,
   FaSignOutAlt,
   FaBars,
   FaTimes
} from 'react-icons/fa';


export default function HeaderComponent() {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const {userInfo} = useSelector((state) => state.auth);
   const [signOutApiCall] = useSignOutMutation();

   const [openMenu, setOpenMenu] = useState(false);
   const [openAdminMenu, setOpenAdminMenu] = useState(false);

   const cartItems = 0;


   async function handleSignOut() {
      console.log('handleSignOut');
      try {
         await signOutApiCall().unwrap();
         dispatch(signOut());
         navigate('/sign-in');

      } catch (err) {
         console.log(`Error: ${err.message}`);

      }
   }

   return (
      <header className="min-w-fit bg-augmented-200 text-augmented-600">
         <div className="container flex items-center justify-around md:mx-auto md:flex md:items-center md:justify-between md:p-4">
            <Link to="/" className="relative left-0 pt-4 pr-4 pb-4 -ml-2 text-lg font-semibold md:pl-12">
               <img src="/img/logo.png" alt="logo" className="h-12"/>
            </Link>
            <div className="md:hidden">
               <button onClick={() => setOpenMenu(!openMenu)}>
                  {openMenu ? <FaTimes size={24}/> : <FaBars size={24}/>}
               </button>
            </div>
            <div
               className={`${openMenu ? 'block' : 'hidden'} md:flex md:items-center md:gap-4 absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-augmented-200 md:bg-transparent z-50 font-semibold tracking-wide md:pr-20`}
            >
               <Link
                  className="relative flex items-center gap-2 p-2 md:p-0"
                  to="/cart"
               >
                  <FaShoppingCart/> Cart
                  {cartItems.length > 0 && (
                     <span
                        className="absolute -top-2 -right-2 bg-augmented-200 text-augmented-600 text-xs
                w-4 h-4 flex items-center justify-center rounded-full max-sm:left-12 max-sm:top-0
                "
                     >
                {cartItems.reduce((a, c) => a + c.qty, 0)}
              </span>
                  )}
               </Link>
               {userInfo ? (
                  <div className=" relative">
                     <Link
                        to="/get-user-profile"
                        className=" flex items-center gap-2 p-2 md:p-0 focus:outline-none"
                     >
                        <FaUser/> {getFirstName(userInfo.username)}
                     </Link>
                  </div>
               ) : (
                  <Link to="/sign-in" className="flex items-center gap-2 p-2 md:p-0">
                     <FaUser/> Sign In
                  </Link>
               )}
               {userInfo && userInfo.role === 'admin' && (
                  <div className=" relative">
                     <button
                        onClick={() => setOpenAdminMenu(!openAdminMenu)}
                        className=" flex items-center gap-1 border border-gray-300 rounded-md hover:border-gray-500 hover:bg-gray-100 hover:text-black transition-all p-1 max-md:mx-2">
                        {getFirstName(userInfo.username)}
                        <FaChevronDown className="mt-0.5"/>
                     </button>
                     {openAdminMenu && (
                        <div
                           className=" absolute right-0 mt-2 w-48 bg-white text-gray-700 shadow-lg rounded-lg z-50">
                           <Link
                              to="/admin/products-list"
                              className="block px-4 py-2 hover:bg-gray-100"
                              onClick={() => setOpenAdminMenu(false)}
                           >
                              Products
                           </Link>
                           <Link
                              to="/admin/orders-list"
                              className="block px-4 py-2 hover:bg-gray-100"
                              onClick={() => setOpenAdminMenu(false)}
                           >
                              Orders
                           </Link>
                           <Link
                              to="/admin/users-list"
                              className="block px-4 py-2 hover:bg-gray-100"
                              onClick={() => setOpenAdminMenu(false)}
                           >
                              Users
                           </Link>
                        </div>
                     )}
                  </div>
               )}
               {userInfo ? (
                  <button onClick={handleSignOut} className=" p-2">
                     <FaSignOutAlt/>
                  </button>
               ) : (
                  ''
               )}
            </div>
         </div>
      </header>

   );
}