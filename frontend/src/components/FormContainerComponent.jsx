export default function FormContainerComponent({children}) {

   return (
      <div className="flex justify-center">
         <div className="w-full max-w-md px-4">{children}</div>
      </div>

   );
}