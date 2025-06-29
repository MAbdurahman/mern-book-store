/************************* imports *************************/
import Order from '../models/orderModel.js';
import asyncHandler from '../utils/asyncHandlerUtils.js';
import ErrorHandler from '../utils/errorHandlerUtils.js';


export const addOrderItems = asyncHandler(async (req, res, next) => {
   res.status(201).json({
      success: true,
      message: 'Order Items Added Successfully',
      data: {
         orderItems: []
      }

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