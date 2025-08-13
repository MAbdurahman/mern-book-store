import React, {useEffect, useState} from 'react';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import LoaderComponent from '../components/LoaderComponent.jsx';
import FormContainerComponent from '../components/FormContainerComponent.jsx';
import {useSignUpMutation} from '../store/users/usersSlice.js';
import {setCredentials} from '../store/auth/authSlice.js';
import useNotification from '../hooks/useNotification.jsx';
import {FaEyeSlash, FaEye} from 'react-icons/fa6';

export default function SignUpPage() {
   const [username, setUsername] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

   const dispatch = useDispatch();
   const navigate = useNavigate();
   const {updateNotification} = useNotification();

   const [signUp, {isLoading}] = useSignUpMutation();
   const {userInfo} = useSelector((state) => state.auth);

   const {search} = useLocation();
   const searchParams = new URLSearchParams(search);
   const redirect = searchParams.get('redirect') || '/';

   async function handleSubmit(event) {
      event.preventDefault();

      if (password !== confirmPassword) {
         updateNotification('error', 'Confirmed Password and Password do not match!');

      } else {
         try {
            const response = await signUp({username, email, password}).unwrap();
            dispatch(setCredentials({...response}));
            navigate(redirect);

         } catch(err) {
            updateNotification('error', err?.data?.message || err.error);
         }
      }
   }

   function handleShowPassword() {
      setShowPassword(!showPassword);
   }

   function handleConfirmPassword() {
      setShowConfirmPassword(!showConfirmPassword);
   }

   useEffect(() => {
      if (userInfo) {
         navigate(redirect);
      }
   }, [navigate, redirect, userInfo]);

   return (
      <FormContainerComponent>
         <h2 className="text-3xl uppercase text-center font-bold mb-4 mt-4">Sign Up</h2>
         <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
               <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
               >
                  Full name
               </label>
               <input
                  type="text"
                  id="name"
                  placeholder="Enter first and last name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-augmented-600"
               />
            </div>
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
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-augmented-600"
               />
               <button
                  type="button"
                  onClick={handleShowPassword}
                  className="absolute inset-y-0 right-2 top-5 text-augmented-900"
               >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
               </button>
            </div>

            <div className="space-y-2 relative">
               <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
               >
                  Confirm Password
               </label>
               <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-augmented-600"
               />
               <button
                  type="button"
                  onClick={handleConfirmPassword}
                  className="absolute inset-y-0 right-2 top-5 text-augmented-900"
               >
                  {showConfirmPassword ? <FaEyeSlash /> :<FaEye />}
               </button>
            </div>

            <button
               type="submit"
               disabled={isLoading}
               className="w-full bg-augmented-700 text-white font-bold py-2 px-3 rounded-sm hover:bg-augmented-600 focus:outline-none focus:right-2 focus:ring-augmented-600"
            >
               SIGN UP
            </button>

         </form>

         <div className="py-3">
            <p className="text-sm text-augmented-900 font-semibold text-right">
               Already have an account ?{" "}
               <Link
                  to={redirect ? `/sign-in?redirect=${redirect}` : "/sign-in"}
                  className="text-augmented-800 font-semibold hover:text-augmented-400"
               >
                  Sign In
               </Link>
            </p>
         </div>
         {isLoading && <LoaderComponent />}
      </FormContainerComponent>

   );
}