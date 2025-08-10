import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import {addToCart, removeFromCart} from '../store/cart/cartSlice.js';
import useNotification from '../hooks/useNotification.jsx';
import EmptyCartError from '../errors/EmptyCartError.jsx';


export default function CartPage() {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const {updateNotification} = useNotification();

   const cart = useSelector((state) => state.cart);
   const {orderItems} = cart;

   function handleAddToCart(product, quantity) {
      dispatch(addToCart({ ...product, quantity }));
   }

   function handleRemoveFromCart(productId) {
      dispatch(removeFromCart(productId));
   }

   function handleCheckout() {
      navigate("/sign-in?redirect=/shipping");
   }

   return (
      <div className=" container mx-auto px-4 py-8">
         {orderItems.length > 0 && (
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Cart</h1>
         )}
         {orderItems.length === 0 ? (
          <EmptyCartError />
         ) : (
            <div className=" flex flex-col lg:flex-row gap-8">
               <div className="lg:w-2/3">
                  <div className="space-y-6">
                     {orderItems.map((item) => (
                        <div
                           key={item._id}
                           className=" flex flex-col md:flex-row items-center gap-6 p-6 border
                    border-gray-200 rounded-sm shadow-sm hover:shadow-md transition-shadow duration-300 bg-white
                    "
                        >
                           <div className="w-24 h-24 flex-shrink-0">
                              <img
                                 src={item.images[0].url}
                                 alt={item.productName}
                                 className="w-full h-full object-cover rounded-lg"
                              />
                           </div>

                           <div className="flex-1">
                              <Link
                                 to={`/product/${item._id}`}
                                 className="text-lg font-semibold text-gray-800 hover:text-primary transition-colors duration-300"
                              >
                                 {item.productName}
                              </Link>
                              <p className="text-gray-600 mt-1">${item.price}</p>
                           </div>

                           <div className="w-24">
                              <select
                                 value={item.quantity}
                                 onChange={(e) =>
                                    handleAddToCart(item, Number(e.target.value))
                                 }
                                 className="w-full p-2 border border-gray-300 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300
                    "
                              >
                                 {[...Array(item.numberInStock).keys()].map((x) => (
                                    <option value={x + 1} key={x + 1}>
                                       {x + 1}
                                    </option>
                                 ))}
                              </select>
                           </div>
                           <button
                              type="button"
                              onClick={() => handleRemoveFromCart(item._id)}
                              className="p-2 text-red-400 hover:text-red-700 transition-colors
                  duration-300
                  "
                           >
                              <FaTrash size={20} />
                           </button>
                        </div>
                     ))}
                  </div>
               </div>

               <div className="lg:w-1/3">
                  <div className="p-6 border border-gray-200 rounded-lg shadow-sm bg-white">
                     <h2 className="text-xl font-bold mb-4 text-gray-800">
                        Cart Summary
                     </h2>
                     <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-600">Total Items:</span>
                        <span className="text-gray-800 font-semibold">
                  {orderItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
                     </div>

                     <div className="flex justify-between items-center mb-6">
                        <span className="text-gray-600">Total Price:</span>
                        <span className="text-2xl font-semibold text-black">
                  ${" "}
                           {orderItems.reduce(
                              (acc, item) => acc + item.quantity * item.price,
                              0
                           )}
                </span>
                     </div>

                     <button
                        type="button"
                        disabled={orderItems.length === 0}
                        onClick={handleCheckout}
                        className="w-full p-3 text-white bg-primary rounded-lg hover:bg-secondary
               disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 hover:scale-102"
                     >
                        Proceed To Checkout
                     </button>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}