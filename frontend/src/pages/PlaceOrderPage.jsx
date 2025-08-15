import React, {useEffect} from 'react';
import {  useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {useCreateOrderMutation} from '../store/orders/orderSlice.js';
import {clearOrderItems} from '../store/cart/cartSlice.js';
import LoaderComponent from '../components/LoaderComponent.jsx';
import EmptyCartError from '../errors/EmptyCartError.jsx';
import useNotification from '../hooks/useNotification.jsx';

export default function PlaceOrderPage() {
   const cart = useSelector((state) => state.cart);
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const {updateNotification} = useNotification();

   const error = null;
   const isLoading = false;
 /*  useEffect(() => {
      if (!cart.shippingAddress.address) {
         navigate('/shipping');
      } else if (!cart.paymentMethod) {
         navigate('/payment');
      }
   }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);*/

   async function handlePlaceOrder() {
      try {
         const res = await createOrder({
            orderItems: cart.orderItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.orderedItemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
         }).unwrap();
         dispatch(clearOrderItems());
         navigate(`/order/${res._id}`);

      } catch(err) {
         updateNotification('error', err?.data?.message || err.error);
      }
   }

   return (
      <div className="container mx-auto p-6">
         <h2 className="text-3xl uppercase text-center font-bold mb-4 mt-4">Checkout</h2>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
               <div className="bg-white p-8 rounded-xl shadow-sm border
           border-gray-100 hover:shadow-md transition-shadow">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                     Shipping Details
                  </h3>
                  <p className="text-gray-600">
                     <strong className="text-primary">Address:</strong>{" "}
                     {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                     {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                  </p>
               </div>

               <div className="bg-white p-8 rounded-xl shadow-sm border
           border-gray-100 hover:shadow-md transition-shadow">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                     Payment Method
                  </h3>
                  <p className="text-gray-600">
                     <strong className="text-primary">Method:</strong>{" "}
                     {cart.paymentMethod}
                  </p>
               </div>

               <div className="bg-white p-8 rounded-xl shadow-sm border
           border-gray-100 hover:shadow-md transition-shadow">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                     Your Order
                  </h3>
                  {cart.orderItems.length === 0 ? (
                     <EmptyCartError />
                  ) : (
                     <div className="space-y-4">
                        {cart.orderItems.map((item, index) => (
                           <div
                              key={index}
                              className="flex flex-col sm:flex-row items-start
                     sm:items-center p-4 rounded-lg hover:bg-gray-50
                     transition-colors"
                           >
                              <div className="w-20 h-20 flex-shrink-0 mb-4 sm:mb-0">
                                 <img
                                    src={item.images[0].url}
                                    alt={item.productName}
                                    className="w-full h-full object-cover rounded-lg"
                                 />
                              </div>

                              <div className="sm:ml-6 flex-1">
                                 <p

                                    className="text-base sm:text-lg font-medium text-primary
                         hover:text-secondary transition-colors"
                                 >
                                    {item.productName}
                                 </p>
                              </div>

                              <div className="sm:text-right mt-4 sm:mt-0">
                                 <p className="text-gray-700">
                                    {item.quantity} x ${item.price} ={" "}
                                    <strong>${(item.quantity * item.price).toFixed(2)}</strong>
                                 </p>
                              </div>
                           </div>
                        ))}
                     </div>
                  )}
               </div>
            </div>

            <div className="lg:col-span-1">
               <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100
           hover:shadow-md transition-shadow">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                     Order Summary
                  </h2>
                  <div className="space-y-4">
                     <div className="flex justify-between">
                        <span className="text-gray-600">Items</span>
                        <span className="text-gray-800">${cart.itemsPrice}</span>
                     </div>
                     <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <span className="text-gray-800">${cart.shippingPrice}</span>
                     </div>
                     <div className="flex justify-between">
                        <span className="text-gray-600">Tax</span>
                        <span className="text-gray-800">${cart.taxPrice}</span>
                     </div>
                     <div className="flex justify-between pt-4">
                <span className="text-lg font-semibold text-gray-800">
                  Total
                </span>
                        <span className="text-lg font-semibold text-gray-800">
                  ${cart.totalPrice}
                </span>
                     </div>
                  </div>

                  {error && (
                     updateNotification('error', error.data.message)
                  )}

                  <div className="mt-8">
                     <button
                        type="button"
                        className="w-full bg-primary text-white py-3 rounded-lg
                 hover:bg-secondary transition-colors disabled:bg-gray-300
                 disabled:cursor-not-allowed"
                        disabled={cart.orderItems.length === 0}
                        onClick={handlePlaceOrder}
                     >
                        {isLoading ? <LoaderComponent /> : "Place Order"}
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}