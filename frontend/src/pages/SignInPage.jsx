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

      try {
         const response = await signIn({email, password}).unwrap();
         dispatch(setCredentials({...response}));
         navigate(redirect);

      } catch (err) {
         updateNotification('error', err?.data?.message || err.error);
      }
   }

   function handleShowPassword() {
      setShowPassword(!showPassword);
   }

   useEffect(() => {
      if (userInfo) {
         navigate(redirect);
      }
   }, [navigate, redirect, userInfo]);

   return (<FormContainerComponent>
         <h2 className="text-3xl uppercase text-center font-bold mb-4 mt-4">Sign
            In</h2>
         <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
               <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
               >
                  Email
               </label>
               <input
                  type="text"
                  id="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-augmented-600"
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
            focus:outline-none focus:ring-2 focus:ring-augmented-600"
               />
               <button
                  type="button"
                  onClick={handleShowPassword}
                  className="absolute inset-y-0 right-2 top-5 text-augmented-900"
               >
                  {showPassword ? <FaEyeSlash/> : <FaEye/>}
               </button>
            </div>
            <button
               type="submit"
               disabled={isLoading}
               className="w-full bg-augmented-700 text-white font-bold py-2 px-3 rounded-sm hover:bg-augmented-600 focus:outline-none focus:right-2 focus:ring-augmented-600"
            >
               SIGN IN
            </button>
            {isLoading && <LoaderComponent/>}
         </form>

         <div className="py-3">
            <p className="text-sm text-augmented-900 font-semibold text-right">
               Do not have an account?{' '}
               <Link
                  to={redirect ? `/sign-up?redirect=${redirect}` : '/sign-up'}
                  className="text-augmented-800 font-semibold hover:text-augmented-400"
               >
                  Sign Up
               </Link>
            </p>
         </div>
      </FormContainerComponent>

   );
}