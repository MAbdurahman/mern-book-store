import NeutralFaceImage from '../assets/img/neutral-face.png';

export default function NoReviewsError() {

   return (
      <div
         className="flex flex-col h-screen justify-center items-center bg-transparent">
         <div className="flex flex-col items-center">
            <img className='max-h-32' src={NeutralFaceImage} alt="Neutral Face" />
            <p className="text-2xl font-semibold tracking-wide text-center  text-gray-600 mb-6">No Reviews for product</p>
            <a href="javascript:history.back()"
               className="px-4 py-2 font-semibold tracking-wider text-neutral-900 bg-neutral-800 rounded-md hover:bg-neutral-600 transition-all duration-200 ease-in-out">
               Go Back
            </a>
         </div>
      </div>

   );
}