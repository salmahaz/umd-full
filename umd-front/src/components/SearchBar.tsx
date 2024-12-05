//import React from 'react'

import { useState } from "react"


function SearchBar({ onSearch }: { onSearch: (value: string) => void }) {
    const[searchValue , setSearchValue] = useState("");//50

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
        onSearch(value); 
      };
  return (
    
  <div className="relative w-80">
    
    <input
      type="text"
      value={searchValue}
      onChange={handleSearch}
      title="Search By"
      placeholder="Search By Id Or Name..."
      className="w-full py-2 pl-4 pr-10 cursor-pointer rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
    <button title="button?" onClick={() => onSearch(searchValue)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M18 10a8 8 0 10-8 8 8 8 0 008-8z" />
      </svg>
    </button>
  </div>


  )
}

export default SearchBar