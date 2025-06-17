/************************* imports *************************/
import {model, Schema} from 'mongoose';

/************************* schemas *************************/
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
         trim: true,
         required: [true, 'Product category is required!'],
      },
      description: {
         type: String,
         trim: true,
         required: [true, 'Product description is required']
      },
      price: {
         type: String,
         trim: true,
         required: [true, 'Product price is required'],
         maxlength: [6, 'Product price cannot be more than 6 characters!'],
         default: '0.00'
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
      },
      user: {
         type: Schema.Types.ObjectId,
         required: true,
         ref: 'User'
      },
      createdAt: {
         type: Date,
         default: Date.now
      }
   },
   {timestamps: true}
);

const Product = new model('Product', productSchema);
export default Product;