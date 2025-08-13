/************************* imports *************************/
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import asyncHandler from '../utils/asyncHandlerUtils.js';
import ErrorHandler from '../utils/errorHandlerUtils.js';
import {calculatePrices} from '../utils/calculatePriceUtils.js';
import {verifyNewTransaction, verifyPaPalPayment} from '../utils/payPalUtils.js';


export const addOrderItems = asyncHandler(async (req, res, next) => {

   const {orderItems, shippingAddress, paymentMethod} = req.body;

   if (orderItems && orderItems.length === 0) {
      return next(new ErrorHandler('No orderItems to add!', 400));

   }

   const itemsFromDatabase = await Product.find({
      _id: {$in: orderItems.map((product) => product._id)}
   });

   const databaseOrderItems = orderItems.map((itemFromFrontend) => {
      const matchingItemFromDB = itemsFromDatabase.find(
         (itemFromDB) => itemFromDB._id.toString() === itemFromFrontend._id
      );

      return {
         ...itemFromFrontend,
         product: itemFromFrontend._id,
         price: matchingItemFromDB.price,
         _id: undefined
      };
   });

   const {orderedItemsPrice, taxPrice, shippingPrice, totalPrice} =
      calculatePrices(databaseOrderItems);

   const order = new Order({
      orderItems: databaseOrderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      orderedItemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
   });

   const createdOrder = await order.save();
   res.status(201).json({
      success: true,
      message: 'Order Items added successfully!',
      createdOrder
   });

});


export const getOrderById = asyncHandler(async (req, res, next) => {
   res.status(200).json({
      success: true,
      message: 'Order Item Found',
      data: {}
   });

});

export const updateOrderToPaid = asyncHandler(async (req, res, next) => {
   res.status(200).json({
      success: true,
      message: 'Order Item Updated Successfully',
      data: {}
   });
});

export const updateOrderToDelivered = asyncHandler(async (req, res, next) => {
   res.status(200).json({
      success: true,
      message: 'Order Item Updated Successfully',
      data: {}
   });
});

export const getMyOrders = asyncHandler(async (req, res, next) => {
   res.status(200).json({
      success: true,
      message: 'Order Item Found',
      data: {}
   });
});

export const getAllUsersOrders = asyncHandler(async (req, res, next) => {
   res.status(200).json({
      success: true,
      message: 'Order Item Found',
      data: {}
   });
});