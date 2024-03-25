import React, { useState } from "react";
import { MdCurrencyRupee } from "react-icons/md";


const DoubleRangeSlider = ({ onChange }) => {
  const [startPrice, setStartPrice] = useState(0);
  const [endPrice, setEndPrice] = useState(10000);

  const handleStartChange = (e) => {
    const value = parseInt(e.target.value);
    setStartPrice(value);
  };

  const handleEndChange = (e) => {
    const value = parseInt(e.target.value);
    setEndPrice(value);
  };

  return (
    <div className="flex items-center w-full">
    <div className="flex flex-col items-center">
      <input
        type="range"
        min={0}
        max={1000}
        value={startPrice}
        onChange={handleStartChange}
        className="h-2 mb-4 bg-gray-300 appearance-none rounded-full focus:outline-none"
      />
      <div className="h-auto border border-black w-20 text-center rounded-md flex gap-1 items-center">
      <MdCurrencyRupee className="ml-2 w-4 h-4"/>
      {startPrice}
      </div>
      </div>
      <div className="flex flex-col items-center">
      <input
        type="range"
        min={1000}
        max={5000}
        value={endPrice}
        onChange={handleEndChange}
        className="h-2 mb-4 bg-gray-300 appearance-none rounded-full focus:outline-none"
      />
       <div className="h-auto border border-black w-20 text-center rounded-md flex gap-1 items-center">
          <MdCurrencyRupee className="ml-2 w-4 h-4"/>
          {endPrice}
       </div>
      </div>
    </div>
  );
};

export default DoubleRangeSlider;
