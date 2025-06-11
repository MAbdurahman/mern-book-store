/************************* imports *************************/
import {model, Schema} from 'mongoose';

const reviewSchema = new Schema({
      user: {
         type: Schema.Types.ObjectId,
         required: true,
         ref: 'User'
      },
      name: {
         type: String,
         required: true
      },
      rating: {
         type: Number,
         required: true
      },
      comments: {
         type: String,
         required: true
      }
   },
   {timestamps: true}
);

const productSchema = new Schema({
      user: {
         type: Schema.Types.ObjectId,
         required: true,
         ref: 'User'
      },
      productName: {
         type: String,
         trim: true,
         required: [true, 'Product name is required!'],
         maxlength: [100, 'Product name cannot be more than 100']
      },
      images: [{
         public_id: {
            type: String,
            required: true
         },
         url: {
            type: String,
            required: true
         }
      }],
      category: {
         type: String,
         required: [true, 'Select a category for the product'],
         enum: ['course', 'template']
      },
      description: {
         type: String,
         trim: true,
         required: [true, 'Product description is required']
      },
      price: {
         type: Number,
         trim: true,
         required: [true, 'Product price is required'],
         maxlength: [6, 'Product price cannot be more than 6 characters!'],
         default: 0.00
      },
      numberInStock: {
         type: Number,
         required: true,
         default: 0
      },
      reviews: [reviewSchema],
      rating: {
         type: Number,
         required: true,
         default: 0
      },
      numberOfReviews: {
         type: Number,
         required: true,
         default: 0
      }
   },
   {timestamps: true}
);

const Product = new model('Product', productSchema);
export default Product;