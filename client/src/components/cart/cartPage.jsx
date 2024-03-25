import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom"
import { setItemsInCart } from "../../store/productReducers";
import CartTable from "./cartTable";
import { useFetchCartMutation, useFetchCartQuery } from "../../store/cartAsyncReducers";

const CartPage = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const uid = searchParams.get("u_id");
    const [cart , setCart] = useState([])

    const body = {userId: uid}

    const token = localStorage.getItem('accessToken')

    const {data: cartItems , isLoading} = useFetchCartQuery({token , body});

    console.log(cartItems);

    const dispatch = useDispatch();

    const fetchCartItemsSideEffects = () => {
        if(cartItems){
           setCart(cartItems)
           const noOfItems = cartItems?.reduce((acc, item) => acc + item.productCount, 0);
           dispatch(setItemsInCart(noOfItems)); 
        }
    }

    useEffect(() => {
        fetchCartItemsSideEffects()
    } , [cartItems])


    if(isLoading){
        return <div className="w-full h-full flex justify-center items-center">fetching cart items ...</div>
    }

    return(
        <div className="w-full flex justify-center">
            <div className="w-4/5 my-5">
                <CartTable cart={cart}/>
            </div>
        </div>
    )
}

export default CartPage