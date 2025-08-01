import React, {useState} from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import useNotification from '../hooks/useNotification.jsx';
import LoaderComponent from '../components/LoaderComponent.jsx';
import RatingComponent from '../components/RatingComponent.jsx';
import NoReviewsError from '../errors/NoReviewsError.jsx';
import MessageComponent from '../components/MessageComponent.jsx';
import {
   useGetSingleProductQuery,
   useCreateProductReviewMutation
} from '../store/products/productsSlice.js';
import {IoChevronBackCircleSharp} from 'react-icons/io5';
import {FaWindowClose} from 'react-icons/fa';

export default function ProductPage() {
   const [isOpen, setIsOpen] = useState(false);

   const {productId} = useParams();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const {updateNotification} = useNotification();

   const [quantity, setQuantity] = useState(1);
   const [rating, setRating] = useState(0);
   const [comment, setComment] = useState('');

   const {
      data: product,
      isLoading,
      refetch,
      error
   } = useGetSingleProductQuery(productId);

   console.log(product);

   const {userInfo} = useSelector((state) => state.auth);
   const [createProductReview, {isLoading: loadingProductReview}] = useCreateProductReviewMutation();

   function handleAddToCart() {
      console.log('handleAddToCart');
   }

   async function handleSubmit(event) {
      console.log('handleSubmit', event.target);
      event.preventDefault();
      try {
         await createProductReview({
            productId: productId,
            rating: rating,
            comment: comment
         }).unwrap();

         refetch();
         updateNotification('success', 'Product Review Created Successfully!');
         setIsOpen(false);
      } catch (err) {
         updateNotification('error', err?.data?.message || err.err);
      }
   }

   return (
      <div className=" max-w-6xl mx-auto p-6">
         <Link to="/">
            <IoChevronBackCircleSharp
               size={36}
               className=" text-primary hover:text-secondary"
            />
         </Link>
         {isLoading ? (
            <LoaderComponent/>
         ) : error ? (
            updateNotification('error', error?.data?.message || error.error)
         ) : (
            <>
               <div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                  <div className=" lg:col-span-1">
                     {
                        product.images && product.images.map((image, index) => (
                           <img key={index} className="w-full rounded-sm shadow-lg"
                                src={image.url} alt={product.productName}/>
                        ))
                     }
                  </div>
                  <div className="lg:col-span-1">
                     <h2
                        className="text-3xl font-bold text-gray-900 border-b border-gray-300 pb-4">
                        {product.productName}
                     </h2>
                     <div className="mt-4 border-b border-gray-300 pb-4">
                        <RatingComponent
                           value={product.rating}
                           text={`${product.numberOfReviews} Reviews`}
                        />
                        <p className="mt-4 text-gray-700 "> {product.description} </p>
                     </div>
                  </div>

                  <div className="lg:col-span-1">
                     <div className="bg-white p-6 rounded-lg shadow-md">
                        <div className="space-y-4">
                           <p className="flex justify-between text-lg">
                              <span className="text-gray-600">Price:</span>
                              <span
                                 className="font-semibold"> ${product.price} </span>
                           </p>
                           <p className="flex justify-between text-lg">
                              <span className="text-gray-600">Status</span>
                              <span
                                 className={`${
                                    product.numberInStock > 0
                                       ? 'text-semantic-s-400'
                                       : 'text-semantic-a-400'
                                 }`}
                              >
                      {product.numberInStock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                           </p>

                           {product.numberInStock > 0 && (
                              <div className="mt-4">
                                 <label
                                    htmlFor="quantity"
                                    className="block text-gray-700 font-semibold mb-2"
                                 >
                                    Quantity
                                 </label>
                                 <select
                                    id="quantity"
                                    className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                 >
                                    {[...Array(product.numberInStock).keys()].map((x) => (
                                       <option key={x + 1} value={x + 1}>
                                          {' '}
                                          {x + 1}
                                       </option>
                                    ))}
                                 </select>
                              </div>
                           )}

                           <button
                              className={`w-full mt-6 py-3 rounded-lg font-semibold ${
                                 product.numberInStock === 0
                                    ? 'bg-gray-300 cursor-not-allowed'
                                    : 'bg-primary hover:bg-secondary text-white'
                              }`}
                              disabled={product.numberInStock === 0}
                              onClick={handleAddToCart}
                           >
                              Add To Cart
                           </button>
                        </div>
                     </div>

                     <div className="mt-8">
                        <h2 className="text-2xl font-bold text-gray-900">Reviews</h2>
                        {product.reviews.length === 0 ? (
                           <MessageComponent variant="info">
                              {error?.data?.message || error.error}
                           </MessageComponent>
                        ) : (
                           <div className="mt-6 space-y-6">
                              {product.reviews.map((review) => (
                                 <div
                                    className="bg-white p-6 rounded-sm shadow-sm"
                                    key={review._id}
                                 >
                                    <div className="flex items-center space-x-4">
                                       <strong className="text-gray-900">
                                          {review.name}
                                       </strong>
                                       <RatingComponent value={review.rating}/>
                                       <p className="text-sm text-gray-500">
                                          {review.createdAt.substring(0, 10)}
                                       </p>
                                    </div>
                                    <p className="mt-2 text-gray-700">{review.comment}</p>
                                 </div>
                              ))}
                           </div>
                        )}

                        {userInfo && !isOpen && (
                           <button
                              className="w-48 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-secondary mt-6"
                              onClick={() => setIsOpen(true)}
                           >
                              Add Review
                           </button>
                        )}
                     </div>
                  </div>
               </div>

               {isOpen && (
                  <div
                     className="fixed inset-0 flex items-center justify-center z-50">
                     <div
                        className="fixed inset-0 backdrop-blur-xs"
                        onClick={() => setIsOpen(false)}
                     ></div>

                     <div
                        className="bg-white p-6 rounded-lg shadow-sm w-96 relative z-50">
                        <button onClick={() => setIsOpen(false)}>
                           <FaWindowClose
                              size={24}
                              className="text-primary hover:text-secondary"
                           />
                        </button>

                        <h2 className="text-xl font-bold text-gray-900 my-y">
                           Add Review{' '}
                        </h2>
                        {loadingProductReview && <LoaderComponent/>}

                        <form onSubmit={handleSubmit} className="space-y-4">
                           <div>
                              <label
                                 className="block text-gray-700 font-semibold mb-2">
                                 Rating
                              </label>
                              <select
                                 className="w-full border rounded-sm p-2 focus:outline-none  focus:ring-2 focus:ring-primary"
                                 required
                                 value={rating}
                                 onChange={(e) => setRating(e.target.value)}
                              >
                                 <option value="">Select...</option>
                                 <option value="1">1 - Poor</option>
                                 <option value="2">2 - Fair</option>
                                 <option value="3">3 - Good</option>
                                 <option value="4">4 - Very Good</option>
                                 <option value="5">5 - Excellent</option>
                              </select>
                           </div>

                           <div>
                              <label
                                 className="block text gray-700 font-semibold mb-2">
                                 Comment
                              </label>
                              <textarea
                                 className="w-full p-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-primary"
                                 rows="4"
                                 required
                                 value={comment}
                                 onChange={(e) => setComment(e.target.value)}
                              ></textarea>
                           </div>

                           <button
                              type="submit"
                              className="w-full py-2 bg-primary text-white rounded-sm font-semibold  hover:bg-secondary"
                              disabled={loadingProductReview}
                           >
                              Submit Review
                           </button>
                        </form>
                     </div>
                  </div>
               )}
            </>
         )}
      </div>
   );
}