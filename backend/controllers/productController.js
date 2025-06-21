import { v2 as cloudinary } from 'cloudinary';
import Product from './../models/productModel.js';
import asyncHandler from '../utils/asyncHandlerUtils.js';

export const createProduct = asyncHandler(async (req, res, next) => {
   let images = [];

   if (typeof req.body.images === "string") {
      images.push(req.body.images);
   } else {
      images = req.body.images;
   }

   const imagesLinks = [];

   for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
         folder: 'mern-book-store/products',
      });

      imagesLinks.push({
         public_id: result.public_id,
         url: result.secure_url,
      });
   }

   req.body.images = imagesLinks;
   req.body.user = req.user.id;

   const product = await Product.create(req.body);

   res.status(201).json({
      success: true,
      message: 'Successfully created product!',
      data: product,
   });

});

export const getAllProducts = asyncHandler(async (req, res, next) => {
   const products = await Product.find({});
   res.status(200).json({
      success: true,
      data: products,
      message: 'Successfully retrieved products!'
   });

});

export const getSingleProduct = asyncHandler(async (req, res, next) => {
   const productId = req.params.productId;

   const singleProduct = await Product.findById(productId);

   if (!singleProduct) {
      res.status(404).json({
         success: false,
         message: 'Product not found!'
      })
   }
   res.status(200).json({
      success: true,
      message: 'Successfully found product!',
      data: singleProduct
   })

});

export const updateProduct = asyncHandler(async (req, res, next) => {
   let product = await Product.findById(req.params.productId);

   if (!product) {
      res.status(404).json({
         success: false,
         message: 'Product not found!'
      })
   }

   let images = [];

   if (typeof req.body.images === "string") {
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
         const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'mern-book-store/products',
         });

         imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
         });
      }
   }
      req.body.images = imagesLinks;

   product = await Product.findByIdAndUpdate(req.params.productId, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
   });

      res.status(200).json({
         success: true,
         message: 'Successfully updated product!',
         data: product,
      });

});


export const deleteProduct = asyncHandler(async (req, res, next) => {
   const product = await Product.findById(req.params.productId);

   if (!product) {
      res.status(404).json({
         success: false,
         message: 'Product not found!'
      })
   }

   // Deleting Images From Cloudinary
   for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
   }

   await product.remove();

   res.status(200).json({
      success: true,
      message: "Successfully deleted product!",
      data: {}
   });

});

export const createProductReview = asyncHandler(async (req, res, next) => {
   const { rating, comment } = req.body;

   const product = await Product.findById(req.params.productId);

   if (!product) {
      res.status(404).json({
         success: false,
         message: 'Product not found!'
      })
   }

   if (product) {
      const alreadyReviewed = product.reviews.find(
         (r) => r.user.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
         res.status(400);
         throw new Error("Product already reviewed");
      }

      const review = {
         name: req.user.name,
         rating: Number(rating),
         comment,
         user: req.user._id,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;

      product.rating =
         product.reviews.reduce((acc, item) => item.rating + acc, 0) /
         product.reviews.length;

      await product.save();

      res.status(201).json({
         success: true,
         message: 'Successfully created review!' });
   }
})