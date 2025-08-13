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

export const getUserOrders = asyncHandler(async (req, res, next) => {
   const orders = await Order.find({ user: req.user._id });
   res.status(200).json({
      success: true,
      message: 'Orders retrieved successfully!',
      orders
   });
});


export const getSingleOrder = asyncHandler(async (req, res, next) => {
   const order = await Order.findById(req.params.id).populate(
      'user',
      'username email'
   );

   if (!order) {
      return next(new ErrorHandler('No Order found with this ID', 404));
   }

   res.status(200).json({
      success: true,
      message: 'Order successfully found!',
      order,
   });

});

export const updateOrderToPaid = asyncHandler(async (req, res, next) => {
   const {verified, value} = await verifyPaPalPayment(req.body.id);
   if (!verified) {
      return next(new ErrorHandler('Payment not verified!', 400));
   }

   const isNewTransaction = await verifyNewTransaction(Order, req.body.id);
   if (!isNewTransaction) {
      return next(new ErrorHandler('Transaction has been used!', 409));
   }

   const order = await Order.findById(req.params.id);
   if (!order) {
      return next(new ErrorHandler('Order not found with this ID', 404));
   }

   const paidCorrectAmount = order.totalPrice === value;
   if (!paidCorrectAmount) {
      return next(new ErrorHandler('Amount paid is not correct!', 400));
   }

   order.isPaid = true;
   order.paidDate = Date.now();
   order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
   };
   for (const item of order.orderItems) {
      const product = await Product.findById(item.product);

      if (!product) {
         return next(new ErrorHandler(`Product ${item.product} not found!`, 404));
      }

      if (product.numberInStock < item.quantity) {
         return next(new ErrorHandler(`${product.productName} does not enough in stock!`, 400));
      }

      product.numberInStock -= item.quantity;
      await product.save();
   }

   const updatedOrder = await order.save();

   res.status(200).json({
      success: true,
      message: 'Order item successfully updated!',
      updatedOrder
   });

});

export const updateOrderToDelivered = asyncHandler(async (req, res, next) => {
   const order = await Order.findById(req.params.id);
   if (!order) {
      return next(new ErrorHandler('Order not found with this ID', 404));
   }

   order.isDelivered = true;
   order.deliveredDate = Date.now();

   const updatedOrder = await order.save();

   res.status(200).json({
      success: true,
      message: 'Order item successfully updated!',
      updatedOrder
   });
});

export const getAllUsersOrders = asyncHandler(async (req, res, next) => {
   const orders = await Order.find({}.populate('user', 'id username'));

   res.status(200).json({
      success: true,
      message: 'Order Item Found',
      orders
   });
});