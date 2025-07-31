import React, {useState} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import useNotification from '../hooks/useNotification.jsx';
import LoaderComponent from '../components/LoaderComponent.jsx';

export default function ProductPage() {

   const dispatch = useDispatch();
   const navigate = useNavigate();
   const {updateNotification} = useNotification();


   function handleAddToCart() {
      console.log('handleAddToCart');
   }

   async function handleSubmit(event) {
      console.log('handleSubmit', event.target);
   }

   return (
      <div>
         <h2>ProductPage</h2>
      </div>

   );
}