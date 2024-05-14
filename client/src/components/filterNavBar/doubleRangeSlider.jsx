import React, { useState } from "react";
import { MdCurrencyRupee } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setRenderList } from "../../store/productReducers";


const DoubleRangeSlider = ({ onChange , setNav }) => {
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

  const {operationList} = useSelector(state => state.products)
  console.log(operationList)

  const priceRangeFilter = () => {
    const original = operationList

    const filtered = original.filter((item) => {
      const discountedPrice = item.price - (item.discount / 100) * item.price;
      return discountedPrice >= startPrice && discountedPrice <= endPrice;
    });

    console.log({'filtered': filtered})
    console.log({'original': original})
    dispatch(setRenderList(filtered))
    setNav(false)
  }

  return (
      <div className="flex flex-col">
            <div className="flex items-center w-full">
              <div className="flex flex-col items-center">
                  <input
                    type="range"
                    min={0}
                    max={5000}
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
                      min={5000}
                      max={100000}
                      value={endPrice}
                      onChange={handleEndChange}
                      className="h-2 mb-4 bg-gray-300 rounded-full appearance-none focus:outline-none"
                    />
                    <div className="flex items-center w-20 h-auto gap-1 text-center border border-black rounded-md">
                        <MdCurrencyRupee className="w-4 h-4 ml-2"/>
                        {endPrice}
                    </div>
                </div>
            </div>
            <button className="self-start p-2 mt-3 border border-black rounded-sm hover:border-solid hover:border-white hover:text-white hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" onClick={priceRangeFilter}>apply price filter</button>
    </div>
  );
};

export default DoubleRangeSlider;
