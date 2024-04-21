import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import LoginForm from "../authPages/loginForm";
import { useDispatch } from "react-redux";
import { useAddToCartMutation, useFetchCartQuery, useFetchProductQuery } from "../../store/cartAsyncReducers";
import Alert from "../alerts/alert";
import { setCartUpdationFlag } from "../../store/productReducers";


const ProductDetailPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const p_id = searchParams.get("p_id");
    const { category } = useParams();

    const[alertBody , setAlertBody] = useState('')

    const [active, setActive] = useState(0);
    const [loginActive, setLoginActive] = useState(false);
    const dispatch = useDispatch()

    const { data: product, isLoading: productLoading, isError: productError } = useFetchProductQuery({ category, p_id });
    const { data: cart, isLoading: cartLoading, isError: cartError } = useFetchCartQuery();

    const[newPrice, setNewPrice] = useState(0);
    const body = {
        selectedProductId: p_id,
        selectedProductName: product?.title || "",
        selectedProductPrice: newPrice
    }

    const token = localStorage.getItem('accessToken')
    const [add, { isLoading: addToCartLoading, isError: addToCartError }] = useAddToCartMutation();

    const handleAddToCart = async () => {
        try {
            const data = await add({ token: token, body: body });
            if (data.error) {
                console.error('Error adding item to cart:', data.error);
                setLoginActive(true);
            } else {
                dispatch(setCartUpdationFlag((prev) => (!prev)))
                alert('Item added successfully');
            }
        } catch (error) {
            console.error('Error adding item to cart:', error);
            alert('Error adding item to cart. Please try again later.');
        }
    };

    useEffect(() => {
        if (!product) return; 
        setNewPrice((prev) => {
            return product.price - (product.discount / 100) * product.price
        });
    }, [product]);

    console.log(product);

    return (
        <div className="relative flex justify-center w-screen h-screen">
            <div className="relative flex flex-col items-center overflow-x-hidden md:flex-row">
                {product ? (
                    <div className={`flex flex-col md:ml-20 items-center mt-6 ${loginActive?'opacity-15':''}`}>
                        <div className="flex gap-3">
                            {product.images?.map((item, idx) => (
                                <div
                                    key={idx}
                                    className={`w-14 h-auto cursor-pointer rounded-md ${
                                        active === idx ? " border-2 border-solid border-blue-700" : ""
                                    }`}
                                    onClick={() => setActive(idx)}
                                >
                                    <img className="p-1 rounded " src={item} alt={`img${idx}`} />
                                </div>
                            ))}
                        </div>
                        <div className="m-6 w-96 md:w-[500px] h-auto border rounded shadow-lg">
                            <img className="p-2" src={product.images?.[active] || ""} alt="" />
                        </div>
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
                <div className="flex flex-col items-center w-3/4 m-1 shadow-lg md:w-1/2 md:mt-5">
                    {product? (
                        <div className={`flex flex-col ${loginActive?'opacity-15 pointer-events-none':''}`}>
                                <div className="flex flex-col px-1">
                                <div className="flex items-center gap-2">
                                    <p className="flex items-center mr-3 text-2xl"><MdOutlineCurrencyRupee/>{newPrice}</p>
                                    <p className="text-xs text-gray-500">M.R.P</p>
                                    <p className="flex items-center text-xs text-gray-500 line-through"><MdOutlineCurrencyRupee/>{product.price}</p>
                                    <p className="text-xs">{`(${product.discount}%) off`}</p>
                                </div>
                                <div className="flex items-center gap-5">
                                        <p className="text-2xl font-semibold">{product.title}</p>
                                        <p className="text-xl text-green-700">{product.stockQuantity > 0?'In Stock':'out'}</p>
                                </div>
                                    <p>{product.description}</p>
                                </div>
                        <div className="flex gap-3 px-1 my-1 font-medium">
                                <p >{`Brand: ${product.brandName}`}</p>
                                <p >{`Origin: ${product.countryOfOrigin}`}</p>                         
                        </div>
                        <div className="flex gap-4 mt-3 mb-4">
                            <button onClick={handleAddToCart} className="px-2 py-1 text-white bg-blue-500 cursor-pointer rounded-xl hover:bg-blue-800 ">Add to cart</button>
                            <button  className="px-2 py-1 text-white bg-blue-500 cursor-pointer rounded-xl hover:bg-blue-800 ">Buy this item</button>
                        </div>
                        </div>
                    ):
                    <div>Loading..</div>}
                </div>
                <div className={`h-96 w-80 z-10 top-1/2 transform -translate-y-3/4 bg-white shadow-xl absolute ${loginActive?'':'hidden'}`}>
                    <div className="relative w-full h-full">
                        <div onClick={() => {setLoginActive(false)}} className="absolute right-0 text-2xl border border-black cursor-pointer">
                            <IoMdClose className="p-1"/>
                        </div>
                    <LoginForm setLoginActive={setLoginActive}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
