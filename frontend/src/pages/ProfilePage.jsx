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
      <div className="container mx-auto my-5">
         <div className="flex space-x-4 mb-4">
            <button
               className={`px-4 py-2 hover:bg-augmented-800 font-semibold ${
                  activeTab === "profile" ? "bg-augmented-800 text-white" : "bg-gray-200"
               }`}
               onClick={() => setActiveTab("profile")}
            >
               User Profile
            </button>
            <button
               className={`px-4 py-2 hover:bg-augmented-800 font-semibold ${
                  activeTab === "orders" ? "bg-augmented-800 text-white" : "bg-gray-200"
               }`}
               onClick={() => setActiveTab("orders")}
            >
               User Orders
            </button>
         </div>

         <FormContainerComponent>
            {activeTab === "profile" && (
               <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-3xl uppercase text-center font-bold mb-4 mt-4">User Profile</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                     <div>
                        <label className="block text-sm font-medium text-gray-700">
                           Name
                        </label>
                        <input
                           type="text"
                           placeholder="Enter name"
                           value={username}
                           onChange={(e) => setUsername(e.target.value)}
                           className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-augmented-600"
                        />
                     </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">
                           Email Address
                        </label>
                        <input
                           type="email"
                           placeholder="Enter email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-augmented-600"
                        />
                     </div>

                     <div className="relative">
                        <label className="block text-sm font-medium text-gray-700">
                           Password
                        </label>
                        <input
                           type={showPassword ? "text" : "password"}
                           placeholder="Enter password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-augmented-600"
                        />
                        <button
                           type="button"
                           onClick={handleShowPassword}
                           className="absolute inset-y-0 right-2 top-6 text-primary"
                        >
                           {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                     </div>

                     <div className="relative">
                        <label className="block text-sm font-medium text-gray-700">
                           Confirm Password
                        </label>
                        <input
                           type={showConfirmPassword ? "text" : "password"}
                           placeholder="Confirm password"
                           value={confirmPassword}
                           onChange={(e) => setConfirmPassword(e.target.value)}
                           className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-augmented-600"
                        />
                        <button
                           type="button"
                           onClick={handleConfirmPassword}
                           className="absolute inset-y-0 right-2 top-6 text-primary"
                        >
                           {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                     </div>

                     <button
                        type="submit"
                        className="w-full bg-augmented-700 text-white font-bold py-2 px-3 rounded-sm hover:bg-augmented-600 focus:outline-none focus:right-2 focus:ring-augmented-600"
                     >
                     UPDATE PROFILE
                     </button>
                     {loadingUpdateProfile && <LoaderComponent />}
                  </form>
               </div>
            )}
         </FormContainerComponent>

         {activeTab === "orders" && (
            <div className="bg-white p-6 rounded-lg shadow-md">
               <h2 className="text-2xl font-bold mb-4">My Orders</h2>
               {isLoading ? (
                  <LoaderComponent />
               ) : error ? (
                  updateNotification('error', 'Something went wrong!')
               ) : (
                  <div className="overflow-x-auto">
                     <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                              ID
                           </th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                              DATE
                           </th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                              TOTAL
                           </th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                              PAID
                           </th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide">
                              DELIVERED
                           </th>
                           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wide"></th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {orders.map((order) => (
                           <tr key={order._id}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                 {order._id}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                 {order.createdAt.substring(0, 10)}
                              </td>

                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                 $ {order.totalPrice}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                 {order.isPaid ? (
                                    order.paidDate.substring(0, 10)
                                 ) : (
                                    <FaTimes className="text-red-500" />
                                 )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                 {order.isDelivered ? (
                                    order.deliveredDate.substring(0, 10)
                                 ) : (
                                    <FaTimes className="text-red-500" />
                                 )}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                 <Link
                                    to={`/order/${order._id}`}
                                    className="text-augmented-800 hover:text-augmented-600"
                                 >
                                    <FaEye size={20} />
                                 </Link>
                              </td>
                           </tr>
                        ))}
                        </tbody>
                     </table>
                  </div>
               )}
            </div>
         )}
      </div>
   );
}