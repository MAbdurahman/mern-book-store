import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import FormContainerComponent from '../components/FormContainerComponent.jsx';
import LoaderComponent from '../components/LoaderComponent.jsx';
import {useGetUserProfileMutation} from '../store/users/usersSlice.js';
import {useGetUserOrderQuery} from '../store/orders/orderSlice.js';
import {setCredentials} from '../store/auth/authSlice.js';
import useNotification from '../hooks/useNotification.jsx';


export default function ProfilePage() {
   const [username, setUsername] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
   const [activeTab, setActiveTab] = useState('profile');

   const { userInfo } = useSelector((state) => state.auth);
   const { data: orders, isLoading, error } = useGetUserOrderQuery();
   const [updateProfile, { isLoading: loadingUpdateProfile }] = useGetUserProfileMutation();

   const dispatch = useDispatch();
   const {updateNotification} = useNotification();

   useEffect(() => {
      setUsername(userInfo.username);
      setEmail(userInfo.email);
   }, [userInfo.username, userInfo.email]);


   function handleShowPassword() {
      setShowPassword(!showPassword);
   }
   function handleConfirmPassword() {
      setShowConfirmPassword(!showConfirmPassword);
   }

   async function handleSubmit(event) {
      event.preventDefault();
      if (password !== confirmPassword) {
         updateNotification('error', 'Confirmed Password and Password do not match!');

      } else {
         try {
            const response = await updateProfile({
               username,
               email,
               password,
            }).unwrap();
            dispatch(setCredentials({ ...response }));
            updateNotification('success', 'Profile successfully updated!');
         } catch(err) {
            updateNotification('error', err?.data?.message || err.error);
         }
      }
   }



   return (
      <div>
         <h2>ProfilePage</h2>
      </div>

   );
}