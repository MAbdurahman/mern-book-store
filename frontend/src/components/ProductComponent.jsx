import {Link} from 'react-router-dom';
import {FaEye} from 'react-icons/fa';
import RatingComponent from './RatingComponent.jsx';

export default function ProductComponent({product}) {

   return (
      <div
         className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-sm border border-neutral-500 shadow-lg transition-transform hover:scale-102 hover:shadow-xl">
         <Link to={`/product/${product._id}`}>
            <img
               className="h-56 w-full object-center"
               src={product.images[0].url}
               alt={product.productName}
            />
         </Link>
         <div className="p-4 space-y-3">
            <Link
               to={`/product/${product._id}`}
               className="block text-lg font-semibold text-neutral-800 hover:text-augmented-600 underline overflow-hidden text-ellipsis whitespace-nowrap"
            >
               {product.productName}
            </Link>
            <div className="flex items-center justify-between">
               <span className="text-lg font-bold text-gray-800">
                   ${product.price}
               </span>
               <div className="flex items-center space-x-1">
                  <span className="ml-2 rounded bg-yellow-200 px-2 py-0.5 text-xs font-semibold">
                     {product.rating}
                  </span>
                  <RatingComponent
                     value={product.rating}
                     text={`${product.numberOfReviews} reviews`}
                  />
               </div>
            </div>
            <Link
               to={`/product/${product._id}`}
               className="flex items-center justify-center gap-2 py-2 w-full rounded-sm bg-augmented-000 border-2 border-augmented-600 font-semibold transition hover:bg-augmented-600 hover:text-augmented-600"
            >
               <FaEye size={20}/> Preview
            </Link>
         </div>
      </div>

   );
};