import {FaStar,  FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

export default function RatingComponent({value, text}) {

   return (
      <div className=" flex items-center space-x-1 text-semantic-w-400">
         {[1, 2, 3, 4, 5].map((i) => (
            <span key={i} className="text-lg sm:text-xl">
          {value >= i ? (
             <FaStar size={16} />
          ) : value >= i - 0.5 ? (
             <FaStarHalfAlt size={16} />
          ) : (
             <FaRegStar size={16} />
          )}
        </span>
         ))}
         {text && <span className="text-sm text-neutral-900 font-semibold ml-2">{text}</span>}
      </div>
   );
};