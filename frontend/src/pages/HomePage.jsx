import {Fragment} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {useGetAllProductsQuery} from '../store/products/productsSlice.js';
import ProductComponent from '../components/ProductComponent.jsx';
import SearchBoxComponent from '../components/SearchBoxComponent.jsx';
import LoaderComponent from '../components/LoaderComponent.jsx';
import PaginationComponent from '../components/PaginationComponent.jsx';
import useNotification from '../hooks/useNotification.jsx';
import MessageComponent from '../components/MessageComponent.jsx';

export default function HomePage() {
   const {pageNumber, keyword: urlKeyword} = useParams;
   const navigate = useNavigate();
   const {updateNotification} = useNotification();

   function handleOnSearch(keyword) {
      if (keyword.trim()) {
         navigate(`/search/${keyword.trim()}`);

      } else {
         navigate('/');
      }
   }

   const {data, isLoading, error} = useGetAllProductsQuery({
      keyword: urlKeyword || '',
      pageNumber: pageNumber || 1
   });

   return (
      <Fragment>
         {isLoading ? (<LoaderComponent/>)
            : error ? (updateNotification('error', error?.data?.message || error.error))
               : (
                  <div className="px-4 py-6">
                     <SearchBoxComponent onSearch={handleOnSearch}/>
                     <div
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {data?.products?.map((product) => (
                           <ProductComponent key={product._id} product={product}/>
                        ))}
                     </div>
                     <PaginationComponent page={data?.page} pages={data?.pages}/>
                  </div>
               )}
      </Fragment>
   );
};