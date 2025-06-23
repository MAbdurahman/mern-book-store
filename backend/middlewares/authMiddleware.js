/************************* imports *************************/
import jwt from 'jsonwebtoken';
import ErrorHandler from '../utils/errorHandlerUtils.js';
import asyncHandler from '../utils/asyncHandlerUtils.js';
import User from '../models/userModel.js';

export const authenticateUser = asyncHandler(async (req, res, next) => {
   const token = req.cookies.book_store;
   console.log(token);

   if (!token) {
      return next(new ErrorHandler('Login required!', 401));
   }
   const decodedData = await jwt.verify(token, process.env.JWT_SECRET);

   req.user = await User.findById(decodedData.id).select('-password');

   next();
});

export const authorizeRole = (...roles) => {
   return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
         return next(
            new ErrorHandler(
               `Role: ${req.user.role} is not allowed to access this resource`, 403
            )
         );
      }
      next();
   };
};