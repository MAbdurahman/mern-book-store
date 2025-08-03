import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import LoaderComponent from '../components/LoaderComponent.jsx';
import FormContainerComponent from '../components/FormContainerComponent.jsx';
import {useSignInMutation} from '../store/users/usersSlice.js';
import {setCredentials} from '../store/auth/authSlice.js';
import useNotification from '../hooks/useNotification.jsx';
import {FaEyeSlash, FaEye} from 'react-icons/fa6';

export default function SignInPage() {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [showPassword, setShowPassword] = useState(false);

   const dispatch = useDispatch();
   const navigate = useNavigate();
   const {updateNotification} = useNotification();

   const [signIn, {isLoading}] = useSignInMutation();
   const {userInfo} = useSelector((state) => state.auth);

   const {search} = useLocation();
   const searchParams = new URLSearchParams(search);
   const redirect = searchParams.get('redirect') || '/';

   async function handleSubmit(event) {
      event.preventDefault();
      console.log('handleSubmit');

   }

   function handleShowPassword() {
      console.log('handleShowPassword');
   }

   return (
      <FormContainerComponent>
         <h2 className="text-3xl font-bold mb-4 mt-4">Sign In</h2>
         <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
               <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
               >
                  Email Address
               </label>
               <input
                  type="email"
                  id="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-primary"
               />
            </div>

            <div className="space-y-2 relative">
               <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
               >
                  Password
               </label>
               <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm
            focus:outline-none focus:ring-2 focus:ring-primary"
               />
               <button
                  type="button"
                  onClick={handleShowPassword}
                  className="absolute inset-y-0 right-2 top-5 text-primary"
               >
                  {showPassword ? <FaEyeSlash/> : <FaEye/>}
               </button>
            </div>
            <button
               type="submit"
               disabled={isLoading}
               className="w-full bg-primary text-white py-2 px-2 rounded-sm hover:bg-secondary focus:outline-none
        focus:right-2 focus:ring-secondary
        "
            >
               Sign In
            </button>
            {isLoading && <LoaderComponent/>}
         </form>

         <div className="py-3">
            <p className="text-sm text-gray-600">
               New User ?{' '}
               <Link
                  to={redirect ? `/register?redirect=${redirect}` : '/register'}
                  className="text-primary hover:text-secondary"
               >
                  Register
               </Link>
            </p>
         </div>
      </FormContainerComponent>

   );
}