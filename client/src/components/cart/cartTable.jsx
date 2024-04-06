import { useEffect, useState } from "react";
import { MdOutlineCurrencyRupee, MdDelete } from "react-icons/md";
import { useUpdateCartCountMutation } from "../../store/cartAsyncReducers";
import { useDispatch } from "react-redux";
import { setCartUpdationFlag } from "../../store/productReducers";
import {loadStripe} from '@stripe/stripe-js';
import RenderRazorpay from "../razorpay/RenderRazorpay.jsx";


const CartTable = ({ cart }) => {

const [displayRazorpay, setDisplayRazorpay] = useState(false);
const [orderDetails, setOrderDetails] = useState(null);

  const dispatch = useDispatch()
  const [updateCount, { isLoading, isError }] = useUpdateCartCountMutation();
  const token = localStorage.getItem("accessToken");
  const updateItemCount = async ({ p_id, actionType }) => {
    const body = {
      p_id,
      actionType,
    };
    const data = await updateCount({ token, body });
    if(data){
      dispatch(setCartUpdationFlag());
    }
  };

  const [total, setTotal] = useState(0);
  const totalPrice = cart?.reduce((acc, item) => acc + item.productCount * item.productPrice, 0);

  useEffect(() => {
    const roundedPrice = totalPrice.toFixed(1)
    setTotal(roundedPrice);
  }, [cart])

  const makePayment = async() => {
    const stripe = await loadStripe("pk_test_51OQl8fSEmo0kwgrlTt96D9sX1ThuIEK2cDyuX9vfRyyEXeJaD4VkYQDvxPco29TZiNeBwf03TVqScnuhIPymQruE00EydpbOby");
    
    const body = {
        products: cart
    }
    const headers = {
        "Content-Type":"application/json"
    }
    const response = await fetch(`https://ecommerce-app-tysz.onrender.com/api/payment/create-checkout-session` , {
        method:'POST',
        headers: headers,
        body :JSON.stringify(body)
    })

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
        sessionId: session.id
    })

    if(result.error){
        console.log(result.error);
    }
}



 const makeRazorPayPayment = async() => {
   try{
      fetch(`https://ecommerce-app-tysz.onrender.com/api/razorPay/razorPayOrder` , {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          amount: totalPrice
        })
      })
      .then(res => res.json())
      .then(orderData => {
        setOrderDetails({
           orderId: orderData.order_id,
           currency: orderData.currency,
           amount: orderData.amount,
         });
         setDisplayRazorpay(true);
      })
    }
   catch(error){
    console.log(error.message)
   }
}

useEffect(() => {
  console.log(displayRazorpay)
console.log(orderDetails)
} , [orderDetails , displayRazorpay])


  return (
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
            <th scope="col" className="px-6 py-3">
              ACTION
            </th>
          </tr>
        </thead>
        <tbody>
          {cart?.map((item, idx) => (
            <tr key={item._id} className={`bg-${idx % 2 === 0 ? "gray-50" : "white"} dark:bg-gray-800 border-b dark:border-gray-700`}>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{idx + 1}</td>
              <td className="px-6 py-4">{item.productName}</td>
              <td className="px-6 py-4">
                <div className="flex border w-16 rounded-lg overflow-hidden">
                  <button onClick={() => updateItemCount({ p_id: item.productId, actionType: 'decrement' })} className="w-6 h-6 bg-slate-200 cursor-pointer hover:bg-slate-300">-</button>
                  <p className="w-8 h-6 flex justify-center">{item.productCount}</p>
                  <button onClick={() => updateItemCount({ p_id: item.productId, actionType: 'increment' })} className="w-6 h-6 bg-slate-200 cursor-pointer hover:bg-slate-300">+</button>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className=" mr-1 flex items-center">
                  <MdOutlineCurrencyRupee />
                  {item.productPrice * item.productCount}
                </div>
              </td>
              <td className="px-6 py-4">
                <div onClick={() => updateItemCount({ p_id: item.productId, actionType: 'delete' })} className="mr-1 flex items-center cursor-pointer">
                  <MdDelete className="w-6 h-6" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="sticky bottom-0 bg-white dark:bg-gray-800 p-4">
        <div className="flex flex-col items-center my-4">
          <div className="flex items-center gap-1 text-lg md:text-xl sticky bottom-0">
            <p className="mr-1">Your total is -</p>
            <MdOutlineCurrencyRupee />
            <p>{total}</p>
            <button onClick={makeRazorPayPayment} className="text-sm px-2 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white ml-4">
              Continue to Pay
            </button>
          </div>
        </div>
      </div>
      {
        displayRazorpay && (
      <RenderRazorpay
        amount={orderDetails.amount}
        currency={orderDetails.currency}
        orderId={orderDetails.orderId}
      />
        )
      }
    </div>
  );
};

export default CartTable;
