import { useEffect, useState } from "react";
import { MdOutlineCurrencyRupee } from "react-icons/md";


const CartTable = ({cart}) => {

const updateCountInCart = (e) => {
   
}  

const[total , setTotal] = useState(0);    

const totalPrice = cart?.reduce((acc , item) => acc+=item.productCount*item.productPrice, 0)

useEffect(() => {
    setTotal(totalPrice)
} , [cart])

    return(
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                PRODUCT
              </th>
              <th scope="col" className="px-6 py-3">
                COUNT
              </th>
              <th scope="col" className="px-6 py-3">
                PRICE
              </th>
            </tr>
          </thead>
          <tbody>
             {
                cart?.map((item , idx) => (
            <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {idx+1}
              </th>
              <td className="px-6 py-4 ">
                {item.productName}
              </td>
              <td className="px-6 py-4">
                <div className="flex border w-16 rounded-lg overflow-hidden">
                  <button className="w-6 h-6 bg-slate-200 cursor-pointer hover:bg-slate-300">-</button>
                  <p className="w-8 h-6 flex justify-center">{item.productCount}</p>
                  <button className="w-6 h-6 bg-slate-200 cursor-pointer hover:bg-slate-300">+</button>
                </div>
              </td>
              <td className="px-6 py-4 flex items-center">
              <div className="flex items-center mr-1">
                <MdOutlineCurrencyRupee/>
                {item.productPrice*item.productCount}
              </div>
              </td>
            </tr>
                ))
             }
          </tbody>
        </table>
        <div className="sticky bottom-0 bg-white dark:bg-gray-800 p-4">
        <div className="flex flex-col items-center my-4">
          <div className="flex items-center gap-1 text-xl">
            <p className="mr-1">Your total is -</p>
            <MdOutlineCurrencyRupee />
            <p>{total}</p>
            <button className="text-sm px-2 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white ml-4">
              Continue to Pay
            </button>
          </div>
        </div>
      </div>
      </div>
    )
}

export default CartTable;