import {v2 as cloudinary} from 'cloudinary';
import Product from './../models/productModel.js';
import Order from './../models/orderModel.js';
import asyncHandler from '../utils/asyncHandlerUtils.js';
import ErrorHandler from './../utils/errorHandlerUtils.js';

export const createProduct = asyncHandler(async (req, res, next) => {
   let images = [];

   if (typeof req.body.images === 'string') {
      images.push(req.body.images);
   } else {
      images = req.body.images;
   }

   const imagesLinks = [];

   for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
         folder: 'mern-book-store/products'
      });

      imagesLinks.push({
         public_id: result.public_id,
         url: result.secure_url
      });
   }

   req.body.images = imagesLinks;
   req.body.user = req.user.id;

   const product = await Product.create(req.body);

   res.status(201).json({
      success: true,
      message: 'Successfully created product!',
      product: product
   });

});

export const getAllProducts = asyncHandler(async (req, res, next) => {
   const pageSize = process.env.PAGINATION_LIMIT || 8;
   const page = Number(req.query.pageNumber) || 1;

   const keyword = req.query.keyword
      ? {name: {$regex: req.query.keyword, $options: 'i'}}
      : {};

   const count = await Product.countDocuments({...keyword});

   const products = await Product.find({...keyword})
      .limit(pageSize)
      .skip(pageSize * (page - 1));

   res.status(200).json({
      success: true,
      message: 'Successfully retrieved products!',
      products: products,
      page: page,
      pages: Math.ceil(count / pageSize)
   });
});

export const getSingleProduct = asyncHandler(async (req, res, next) => {
   const productId = req.params.productId;

   const singleProduct = await Product.findById(productId);

   if (!singleProduct) {
      return next(new ErrorHandler(`Product not found with Id: ${req.params.productId}`, 404));
   }

   res.status(200).json({
      success: true,
      message: 'Successfully found product!',
      product: singleProduct

   });
});

export const updateProduct = asyncHandler(async (req, res, next) => {
   let product = await Product.findById(req.params.productId);

   if (!product) {
      return next(new ErrorHandler(`Product not found with Id: ${req.params.productId}`, 404));
   }

   let images = [];

   if (typeof req.body.images === 'string') {
      images.push(req.body.images);

   } else {
      images = req.body.images;

   }

   if (images !== undefined) {
      // Deleting Images From Cloudinary
      for (let i = 0; i < product.images.length; i++) {
         await cloudinary.v2.uploader.destroy(product.images[i].public_id);
      }

      const imagesLinks = [];

      for (let i = 0; i < images.length; i++) {
         const cloudinaryResult = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'mern-book-store/products'
         });

         imagesLinks.push({
            public_id: cloudinaryResult.public_id,
            url: cloudinaryResult.secure_url
         });
      }
   }
   req.body.images = imagesLinks;

   product = await Product.findByIdAndUpdate(req.params.productId, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false
   });

   res.status(200).json({
      success: true,
      message: 'Successfully updated product!',
      product: product

   });

});

export const deleteProduct = asyncHandler(async (req, res, next) => {
   const product = await Product.findById(req.params.productId);

   if (!product) {
      return next(new ErrorHandler(`Product not found with Id: ${req.params.productId}`, 404));
   }

   // Deleting Images From Cloudinary
   for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
   }

   await Product.deleteOne({_id: product._id});

   res.status(200).json({
      success: true,
      message: 'Successfully deleted product!',
      product: {}
   });

});

export const createProductReview = asyncHandler(async (req, res, next) => {
   const {rating, comment} = req.body;

   const product = await Product.findById(req.params.productId);
   if (!product) {
      return next(new ErrorHandler(`Product does not exist with Id: ${re.params.productId}`, 404));
   }

   const userOrders = await Order.find({user: req.user._id});
   const orderedItems = [].concat.apply([], userOrders.map(userOrder => userOrder.orderedItems.map(orderedItem => orderedItem.product.toString())));

   const hasBought = orderedItems.includes(product._id.toString());
   if (!hasBought) {
      return next(new ErrorHandler('User can only review a product purchased!', 400));
   }

   const alreadyReviewed = product.reviews.find(review => review.user.toString() === req.user._id.toString());
   if (alreadyReviewed) {
      return next(new ErrorHandler(`Product has already been reviewed with Id: ${req.params.productId}`, 400));

   }

   const review = {
      name: req.user.username,
      rating: Number(rating),
      comments: comment,
      user: req.user._id
   }

   product.reviews.push(review);
   product.numberOfReviews = product.reviews.length;
   product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

   await product.save();

   res.status(201).json({
      success: true,
      message: 'Successfully created review!',
      review: review

   });
});