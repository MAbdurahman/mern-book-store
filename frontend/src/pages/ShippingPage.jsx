import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import FormContainerComponent from '../components/FormContainerComponent.jsx';
import {saveShippingAddress} from '../store/cart/cartSlice.js';

export default function ShippingPage() {
   const cart = useSelector((state) => state.cart);
   const {shippingAddress} = cart;

   const [address, setAddress] = useState(shippingAddress.address || '');
   const [city, setCity] = useState(shippingAddress.city || '');
   const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');

   const [country, setCountry] = useState(shippingAddress.country || '');
   const dispatch = useDispatch();
   const navigate = useNavigate();

   function handleSubmit(event) {
      event.preventDefault();
      dispatch(saveShippingAddress({address, city, postalCode, country}));
      navigate('/payment');

   }

   return (<FormContainerComponent>
      <h2
         className="text-3xl uppercase text-center font-bold mb-4 mt-4">Shipping</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
         <div className=" space-y-2">
            <label
               htmlFor="address"
               className="block text-sm font-medium text-gray-700"
            >
               Address
            </label>
            <input
               type="text"
               id="address"
               placeholder="Enter address"
               value={address}
               required
               onChange={(e) => setAddress(e.target.value)}
               className="w-full p-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2
           focus:ring-primary"
            />
         </div>
         <div className=" space-y-2">
            <label
               htmlFor="city"
               className="block text-sm font-medium text-gray-700"
            >
               City
            </label>
            <input
               type="text"
               id="city"
               placeholder="Enter city"
               value={city}
               required
               onChange={(e) => setCity(e.target.value)}
               className="w-full p-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2
           focus:ring-primary"
            />
         </div>
         <div className=" space-y-2">
            <label
               htmlFor="postalCode"
               className="block text-sm font-medium text-gray-700"
            >
               Postal code
            </label>
            <input
               type="text"
               id="postalCode"
               placeholder="Enter Postal code"
               value={postalCode}
               required
               onChange={(e) => setPostalCode(e.target.value)}
               className="w-full p-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2
           focus:ring-primary"
            />
         </div>
         <div className=" space-y-2">
            <label
               htmlFor="country"
               className="block text-sm font-medium text-gray-700"
            >
               Country
            </label>
            <input
               type="text"
               id="country"
               placeholder="Enter country"
               value={country}
               required
               onChange={(e) => setCountry(e.target.value)}
               className="w-full p-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2
           focus:ring-primary"
            />
         </div>
         <button
            type="submit"
            className="w-full bg-augmented-700 text-white font-bold py-2 px-3 rounded-sm hover:bg-augmented-600 focus:outline-none focus:right-2 focus:ring-augmented-600"
         >CONTINUE
         </button>
      </form>
   </FormContainerComponent>);
}