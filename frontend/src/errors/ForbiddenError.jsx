import ForbiddenErrorImage from '@/assets/img/forbidden.png';


export default function ForbiddenError() {

   return (
      <div
         className="flex flex-col h-screen justify-center items-center bg-gray-100">
         <div className="flex flex-col items-center">
            <img className='max-h-24 mb-2' src={ForbiddenErrorImage} alt="Forbidden image sign" />
            <p className="text-2xl font-semibold capitalize tracking-wide text-center  text-gray-600 mb-6">403 - Forbidden!</p>
            <a href="/"
               className="px-4 py-2 font-semibold uppercase tracking-wider text-neutral-900 bg-neutral-800 rounded-md hover:bg-neutral-600 transition-all duration-200 ease-in-out">
               Go To Home
            </a>
         </div>
      </div>

   );
}