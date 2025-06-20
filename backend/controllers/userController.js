/************************* imports *************************/
import validator from 'validator';
import User from '../models/userModel.js';
import asyncHandler from '../utils/asyncHandlerUtils.js';
import ErrorHandler from '../utils/errorHandlerUtils.js';
import generateToken from '../utils/generateTokenUtils.js';
import {
   validateEmail,
   validateName,
   validatePassword
} from '../utils/functionUtils.js';

export const signUpUser = asyncHandler(async (req, res, next) => {
   const {username, email, password} = req.body;

   if (!username) {
      return next(new ErrorHandler('Full name is required!', 400));
   }
   if (username.length > 33) {
      return next(new ErrorHandler('Full name cannot exceed 32 characters!', 406));
   }
   if (!validateName()){
      return next(new ErrorHandler('Enter your first and last name!', 406));
   }

   if (!email) {
      return next(new ErrorHandler('Email is required!', 400));
   }
   if (!validateEmail(email)) {
      return next(new ErrorHandler('Enter a valid email address!', 406));
   }

   if (!password) {
      return next(new ErrorHandler('Password is required!', 400));
   }
   if (!validatePassword(password)) {
      return next(new ErrorHandler('Password must contain at least 8 characters, a number, a symbol, a lowercase an uppercase letter!', 406));
   }

   const userAlreadyExists = await User.findOne({email});
   if (userAlreadyExists) {
      return next(new ErrorHandler('User already exists!', 409));
   }

   const user = await User.create({
      username,
      email,
      password,
   });

   if (user) {
      generateToken(res, user);
      res.status(201).json({
         _id: user._id,
         username: user.username,
         email: user.email,
         role: user.role,
      });
   }

});

export const signInUser = asyncHandler(async (req, res, next) => {
   const {email, password} = req.body;

   if (!email) {
      return next(new ErrorHandler('Email is required!', 400));
   }
   if (!password) {
      return next(new ErrorHandler('Password is required!', 400));
   }

   const user = await User.findbyOne({email});
   if (!user) {
      return next(new ErrorHandler('User does not exist!', 404));
   }

   const matchedPassword = await user.matchPassword(password);
   if (!matchedPassword) {
      return next(new ErrorHandler('Invalid credentials!', 406));
   }

   generateToken(res, user);

   res.status(200).json({
      name: user.name,
      email: user.email,
      role: user.role
   });
});

export const signOutUser = asyncHandler(async (req, res, next) => {
   res.clearCookie('book-store').status(200).json({
      success: true,
      message: 'Signed out successfully!',
   });
});

export const getUserProfile = asyncHandler(async (req, res, next) => {
   const user = await User.findById(req.params.userId);

   if (!user) {
      return next(new ErrorHandler(`User does not exist with Id: ${req.params.userId}`, 404));
   }

   res.status(200).json({
      success: true,
      user: user,
   })
});

export const updateUserProfile = asyncHandler(async (req, res, next) => {
      res.status(200).json({
         success: true,
         message: 'update user profile controller',
         data: {}
      });
});

export const updateUser = asyncHandler(async (req, res, next) => {

   res.status(200).json({
      success: true,
      message: 'update user controller',
      data: {}
   })

});

export const deleteUser = asyncHandler(async (req, res, next) => {
   const user = await User.findById(req.params.userId);

   if (!user) {
      return next(new ErrorHandler(`User does not exist with Id: ${req.params.userId}`, 404));
   }

   await user.remove();

   res.status(200).json({
      success: true,
      message: 'Successfully deleted user!',
   });
});

export const getAllUsers = asyncHandler(async (req, res, next) => {
   const users = await User.find({});

   if (!users) {
      return next(new ErrorHandler(`Users resource does not exist!`, 404));
   }

   res.status(200).json({
      success: true,
      message: 'Successfully retrieved all users.',
      users: users
   });
});

export const getSingleUser = asyncHandler(async (req, res, next) => {
   const user = await User.findById(req.params.userId).select("-password");

   if (!user) {
      return next(new ErrorHandler(`User does not exist with Id: ${req.params.userId}`, 404));
   }

   res.status(200).json({
      success: true,
      message: 'Successfully retrieved user!',
      users: user
   });
});