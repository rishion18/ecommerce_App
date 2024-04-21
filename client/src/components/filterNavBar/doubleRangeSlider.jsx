import React, { useState } from "react";
import { MdCurrencyRupee } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setRenderList } from "../../store/productReducers";


const DoubleRangeSlider = ({ onChange }) => {
  const [startPrice, setStartPrice] = useState(0);
  const [endPrice, setEndPrice] = useState(10000);

  const dispatch = useDispatch()

  const handleStartChange = (e) => {
    const value = parseInt(e.target.value);
    setStartPrice(value);
  };

  const handleEndChange = (e) => {
    const value = parseInt(e.target.value);
    setEndPrice(value);
  };

  // const {operationList} = useSelector(state => state.products)
  // console.log(operationList)

  // const priceRangeFilter = () => {
  //   const original = operationList
  //   const priceAdjusted = original.map((item) => {
  //     const discountedPrice = item.price - (item.discount / 100) * item.price;
  //     return { ...item, price: discountedPrice };
  //   });
  //   const filtered = priceAdjusted.filter((item) => item.price >= startPrice && item.price <= endPrice);
  //   const final = 
  //   console.log({'filtered': filtered})
  //   console.log({'original': original})
  //   console.log({'priceAdjust': priceAdjusted})
  //   dispatch(setRenderList())
  // }

  return (
    <div className="flex items-center w-full">
    <div className="flex flex-col items-center">
      <input
        type="range"
        min={0}
        max={1000}
        value={startPrice}
        onChange={handleStartChange}
        className="h-2 mb-4 bg-gray-300 rounded-full appearance-none focus:outline-none"
      />
      <div className="flex items-center w-20 h-auto gap-1 text-center border border-black rounded-md">
      <MdCurrencyRupee className="w-4 h-4 ml-2"/>
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
        className="h-2 mb-4 bg-gray-300 rounded-full appearance-none focus:outline-none"
      />
       <div className="flex items-center w-20 h-auto gap-1 text-center border border-black rounded-md">
          <MdCurrencyRupee className="w-4 h-4 ml-2"/>
          {endPrice}
       </div>
      </div>
      <button>apply</button>
    </div>
  );
};

export default DoubleRangeSlider;
