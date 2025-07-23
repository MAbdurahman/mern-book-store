import React, {useState} from 'react';

export default function SearchBoxComponent({onSearch}) {
   const [keyword, setKeyword] = useState('');

   function handleKeywordChange(event) {
      console.log(`keyword: ${event.target.value}`);
      const value = event.target.value;
      setKeyword(value);
      onSearch(value);
   }

   return (
      <form className=" flex items-center justify-center mb-5">
         <input
            type="text"
            name="search"
            onChange={handleKeywordChange}
            value={keyword}
            placeholder="Search... "
            className="p-2 border border-augmented-600 rounded-sm focus:outline-none focus:ring-augmented-700 w-70"
         />
      </form>

   );
};