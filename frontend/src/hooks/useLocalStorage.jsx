import {useState} from 'react';

export default function useLocalStorage(key, initialValueArr = []) {
   const [storedValue, setStoredValue] = useState(() => {
      try {
         if (typeof window === 'undefined') {
            return initialValueArr;

         }
         const value = localStorage.getItem(key);
         return value !== null ? JSON.parse(value) : initialValueArr;

      } catch(err) {
         console.log(err.message);
         return initialValueArr;

      }
   });

   const setValue = value => {
      try {
         const valueToStore = value instanceof Function ? value(storedValue) : value;
         setStoredValue(valueToStore);

         localStorage.setItem(key, JSON.stringify(valueToStore));

      } catch(err) {
         console.log(err.message);

      }
   };

   return [storedValue, setValue];

}