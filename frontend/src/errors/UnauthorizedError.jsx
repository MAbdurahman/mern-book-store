export default function UnauthorizedError() {

   return (
      <div
         className="flex flex-col h-screen justify-center items-center bg-gray-100">
         <div className="flex flex-col items-center">
            <h1 className="text-[120px] font-bold font-mono text-gray-700">401</h1>
            <p className="text-2xl font-semibold tracking-wide   text-gray-600 mb-6">Unauthorized Access!</p>
            <a href="/"
               className="px-4 py-2 font-semibold tracking-wider text-neutral-900 bg-neutral-800 rounded-md hover:bg-neutral-600 transition-all duration-200 ease-in-out">
               Go To HomePage
            </a>
         </div>
      </div>
   );
}