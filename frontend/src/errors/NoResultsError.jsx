import NoResultsImage from '../../assets/img/no-results.png';

export default function NoResultsError() {
   return (
      <div
         className="flex flex-col h-screen justify-center items-center bg-gray-100">
         <div className="flex flex-col items-center">
            <img className='max-h-32' src={NoResultsImage} alt="Sad Face" />
            <p className="text-2xl font-semibold tracking-wide text-center  text-gray-600 mb-6">Sorry, we couldn't find any results</p>
            <a href="/"
               className="px-4 py-2 font-semibold tracking-wider text-neutral-900 bg-neutral-800 rounded-md hover:bg-neutral-600 transition-all duration-200 ease-in-out">
               Go Back Search
            </a>
         </div>
      </div>

   );
}