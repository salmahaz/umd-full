import React, { useState } from 'react';
import "./DropDown.css";

const DropdownExample = ({ onSort }: { onSort: (value: string) => void }) => {
  const [selectedOption, setSelectedOption] = useState<string>('');  // State to hold the selected option

 
  const options = ['Last 30 Days', 'Last 7 Days', 'Descending Id Order'];

 
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedOption(value);  
    console.log(value); 

    
    onSort(value);
  };

  return (
    <div>
      <select
        value={selectedOption}  
        name="selectOption"
        title="Sort By"
        onChange={handleChange}  
      >
        <option value="">Sort By Creation Date</option>  
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>  
        ))}
      </select>
    </div>
  );
};

export default DropdownExample;
