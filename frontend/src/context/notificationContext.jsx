import {useState, createContext} from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const NotificationContext = createContext();
let timeoutID1;
let timeoutID2;

// eslint-disable-next-line react/prop-types
export default function NotificationProvider({ children }) {

   const [notification, setNotification] = useState("");
   const [classes, setClasses] = useState("");
   const [exitToLeft, setExitToLeft] = useState(false);


   const updateNotification = (type, value) => {
      if (timeoutID1) {
         clearTimeout(timeoutID1);
         clearTimeout(timeoutID2);
      }

      switch (type) {
         case "error":
            setClasses("bg-semantic-a-400");
            break;
         case "inform":
            setClasses("bg-semantic-i-400");
            break;
         case "success":
            setClasses("bg-semantic-s-400");
            break;
         case "warning":
            setClasses("bg-semantic-w-400");
            break;
         default:
            setClasses("bg-semantic-a-400");
      }
      setNotification(value);

      timeoutID1 = setTimeout(() => {
         setExitToLeft(true);

         timeoutID2 = setTimeout(() => {
            setNotification("");
            setExitToLeft(false);
         }, 1500);

      }, 3500);
   };

   return (
      <NotificationContext.Provider value={{updateNotification}}>
         {children}
         {notification && (<div className="absolute left-1/2 -translate-x-1/2 top-80">
            <div
               className={`${exitToLeft ? "exit-to-left" : "move-in-from-right"}` + " shadow-md shadow-gray-400 bg-semantic-a-400 rounded-md"}>
               <p className={classes + ' text-gray-50 px-4 py-4 font-body font-semibold utils-notify utils-center-text'}>
                  {notification}
               </p>
            </div>
         </div>)}
      </NotificationContext.Provider>
   );
}