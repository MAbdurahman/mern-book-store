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
      return next(new ErrorHandler('First and last names are required!', 400));
   }
   if (username.length >= 33) {
      return next(new ErrorHandler('First and last names cannot exceed 32 characters!', 406));
   }
   if (!validateName(username)){
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

   const user = await User.findOne({email});
   if (!user) {
      return next(new ErrorHandler('User does not exist!', 404));
   }

   const matchedPassword = await user.matchPassword(password);
   if (!matchedPassword) {
      return next(new ErrorHandler('Invalid credentials!', 406));
   }

   generateToken(res, user);

   res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
   });
});

export const signOutUser = asyncHandler(async (req, res, next) => {
   res.clearCookie('book_store').status(200).json({
      success: true,
      message: 'Successfully signed out!',
   });
});

export const getUserProfile = asyncHandler(async (req, res, next) => {
   const user = await User.findById(req.user._id);

   if (!user) {
      return next(new ErrorHandler(`User does not exist with Id: ${req.user._id}`, 404));
   }
   res.status(200).json({
      success: true,
      message: 'Successfully retrieved profile!',
      data: {
         _id: user._id,
         username: user.username,
         email: user.email,
         role: user.role
      }
   });
});

export const updateUserProfile = asyncHandler(async (req, res, next) => {
   const user = await User.findById(req.user._id);

   if (!user) {
      return next(new ErrorHandler('User does not exist!', 404));
   }

   if (req.body.username && req.body.username.length >= 33) {
      return next(new ErrorHandler('Full name cannot exceed 32 characters!', 406));
   }

   if (req.body.username && !validateName(req.body.username)) {
      return next(new ErrorHandler('Enter your first and last name!', 406));
   }

   if(req.body.email && !validateEmail(req.body.email)) {
      return next(new ErrorHandler('Enter a valid email address!', 406));
   }

   if(req.body.password && !validatePassword(req.body.password)) {
      return next(new ErrorHandler('Password must contain at least 8 characters, a number, a symbol, a lowercase and uppercase letter!', 406));
   }
   user.username = req.body.username || user.username;
   user.email = req.body.email || user.email;

   if (req.body.password) {
      user.password = req.body.password;
   }

   const updatedUser = await user.save();


      res.status(200).json({
         success: true,
         message: 'Successfully updated user!',
         data: {
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            role: updatedUser.role,
         }
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
      data: {
         users
      }
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
      data: {
         user
      }
   });
});

export const updateUser = asyncHandler(async (req, res, next) => {
   const user = await User.findById(req.params.userId);

   if (!user) {
      return next(new ErrorHandler(`User is not found with id: ${req.params.id}`));
   }

   if (req.body.username && req.body.username.length >= 33) {
      return next(new ErrorHandler('Full name cannot exceed 32 characters!', 406));
   }

   if (req.body.username && !validateName(req.body.username)) {
      return next(new ErrorHandler('Enter your first and last name!', 406));
   }

   if(req.body.email && !validateEmail(req.body.email)) {
      return next(new ErrorHandler('Enter a valid email address!', 406));
   }
   if(req.body.password && !validatePassword(req.body.password)) {
      return next(new ErrorHandler('Password must contain at least 8 characters, a number, a symbol, a lowercase and uppercase letter!', 406));
   }

   user.username = req.body.username || user.username;
   user.email = req.body.email || user.email;
   user.role = req.body.role || user.role;

   if (req.body.password) {
      user.password = req.body.password;
   }

   const updatedUser = await user.save();

   res.status(200).json({
      success: true,
      message: 'Successfully updated user!',
      data: {
         _id: updatedUser._id,
         username: updatedUser.username,
         email: updatedUser.email,
         role: updatedUser.role,
      }
   });
});

export const deleteUser = asyncHandler(async (req, res, next) => {
   const user = await User.findById(req.params.userId);

   if (!user) {
      return next(new ErrorHandler(`User does not exist with Id: ${req.params.userId}`, 404));
   }

   await User.deleteOne({ _id: user._id });

   res.status(200).json({
      success: true,
      message: 'Successfully deleted user!',
      data: {}
   });
});