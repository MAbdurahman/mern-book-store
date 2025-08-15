import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainerComponent from '../components/FormContainerComponent.jsx';
import {savePaymentMethod} from '../store/cart/cartSlice.js';

export default function PaymentPage() {
   const navigate = useNavigate();
   const cart = useSelector((state) => state.cart);
   const { shippingAddress } = cart;

/*   useEffect(() => {
      if (!shippingAddress.address) {
         navigate('/shipping');
      }
   }, [navigate, shippingAddress]);*/

   const [paymentMethod, setPaymentMethod] = useState("PayPal");
   const dispatch = useDispatch();

   function handleSubmit(event) {
      event.preventDefault();
      dispatch(savePaymentMethod(paymentMethod));
      navigate('/place-order');
   }

   return (
      <FormContainerComponent>
         <h2 className="text-3xl uppercase text-center font-bold mb-4 mt-4">Payment Method</h2>
         <form
            onSubmit={handleSubmit}
            className="block text-sm font-medium text-gray-700"
         >
            <div className="mb-3">
               <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Method :
               </label>
               <div>
                  <label className="flex items-center space-x-2">
                     <input
                        type="radio"
                        name="paymentMethod"
                        value="PayPal"
                        checked={paymentMethod === "PayPal"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="form-radio h-4 w-4 accent-augmented-800 focus:ring-augmented-800 border-gray-300"
                     />
                     <span className="ml-1 text-gray-700">PayPal or Credit Card</span>
                  </label>
               </div>
            </div>

            <button
               type="submit"
               className="w-full bg-augmented-700 text-white font-bold py-2 px-3 rounded-sm hover:bg-augmented-600 focus:outline-none focus:right-2 focus:ring-augmented-600"
            >
               CONTINUE
            </button>
         </form>
      </FormContainerComponent>
   );
}