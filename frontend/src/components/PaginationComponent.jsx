import {Link} from 'react-router-dom';

export default function PaginationComponent({pages,page, keyword = '', role = 'user'}) {

   return (
      pages > 1 &&(
         <div className=' flex justify-center mt-8'>
            <nav className='block'>
               <ul className='flex pl-0 list-none flex-wrap'>
                  {[...Array(pages).keys()].map((x)=>(
                     <li key={x + 1}>
                        <Link to={
                           role = 'admin' ? `/admin/product-list/${x + 1}`
                              : keyword ?
                                 `/search/${keyword}/page/${x + 1}`
                                 :
                                 `/page/${x + 1}`
                        }
                              className={`${
                                 x + 1 === page ?
                                    "bg-augmented-600 font-semibold text-augmented-600":"text-neutral-000 hover:bg-augmented-700 hover:text-neutral-100"
                              } first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 rounded-full items-center justify-center leading-tight relative border border-solid  border-augmented-600`}

                        >
                           {x + 1}
                        </Link>
                     </li>
                  ))}
               </ul>
            </nav>
         </div>
      )

   );
};