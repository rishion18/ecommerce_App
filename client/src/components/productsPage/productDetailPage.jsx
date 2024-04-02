import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import LoginForm from "../authPages/loginForm";
import { useDispatch } from "react-redux";
import { useAddToCartMutation, useFetchCartQuery, useFetchProductQuery } from "../../store/cartAsyncReducers";


const ProductDetailPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const p_id = searchParams.get("p_id");
    const { category } = useParams();

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
                alert('Please log in to access cart.');
                setLoginActive(true);
            } else {
                console.log('Item added successfully:', data);
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
        <div className="flex w-screen h-screen justify-center">
            <div className="flex flex-col md:flex-row items-center relative overflow-x-hidden">
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
                                    <img className=" rounded p-1" src={item} alt={`img${idx}`} />
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
                <div className="m-1 w-3/4 md:w-1/2 md:mt-5 shadow-lg flex flex-col items-center">
                    {product? (
                        <div className={`flex flex-col ${loginActive?'opacity-15 pointer-events-none':''}`}>
                                <div className="flex flex-col px-1">
                                <div className="flex gap-2 items-center">
                                    <p className="flex items-center text-2xl mr-3"><MdOutlineCurrencyRupee/>{newPrice}</p>
                                    <p className="text-xs text-gray-500">M.R.P</p>
                                    <p className="line-through text-xs text-gray-500 flex items-center"><MdOutlineCurrencyRupee/>{product.price}</p>
                                    <p className="text-xs">{`(${product.discount}%) off`}</p>
                                </div>
                                <div className="flex gap-5 items-center">
                                        <p className="font-semibold text-2xl">{product.title}</p>
                                        <p className="text-green-700 text-xl">{product.stockQuantity > 0?'In Stock':'out'}</p>
                                </div>
                                    <p>{product.description}</p>
                                </div>
                        <div className="flex gap-3 px-1 my-1 font-medium">
                                <p >{`Brand: ${product.brandName}`}</p>
                                <p >{`Origin: ${product.countryOfOrigin}`}</p>                         
                        </div>
                        <div className="flex gap-4 mt-3 mb-4">
                            <button onClick={handleAddToCart} className="px-2 py-1 rounded-xl text-white bg-blue-500 hover:bg-blue-800 cursor-pointer ">Add to cart</button>
                            <button  className="px-2 py-1 rounded-xl text-white bg-blue-500 hover:bg-blue-800 cursor-pointer ">Buy this item</button>
                        </div>
                        </div>
                    ):
                    <div>Loading..</div>}
                </div>
                <div className={`h-96 w-80 z-10 top-1/2 transform -translate-y-3/4 bg-white shadow-xl absolute ${loginActive?'':'hidden'}`}>
                    <div className="w-full h-full relative">
                        <div onClick={() => {setLoginActive(false)}} className="absolute border border-black text-2xl right-0 cursor-pointer">
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
