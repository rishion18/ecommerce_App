import { useEffect, useState } from "react";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import {Link, useNavigate} from 'react-router-dom'


const ProductCard = ({item}) => {

    const navigate = useNavigate();

    const[newPrice , setNewPrice] = useState(0);

    const calculatePrice = () => {
        if(item.discount !== 0){
            const afterDisc = item.price - (item.discount/100)*item.price
            setNewPrice(afterDisc);
        }
    }



    useEffect(() => {
      calculatePrice()
    } , [])

    return(
        <Link className="w-full h-full flex items-center justify-center" to={`/${item.category}/detail?p_id=${item._id}`} >
           <div className="flex flex-col w-40 h-[315px] md:w-56 md:h-[450px] m-3 border">
                <div className="w-full h-32 md:w-56 md:h-56 border">
                <img src={item.images[0]} className="h-32 w-full md:w-56 md:h-56 object-cover" alt="img"/>
                </div>
                <div className="flex justify-center mt-3 px-2 mb-1">
                    <p className="font-semibold text-sm truncate">{item.title}</p>
                </div>
                <div className="flex justify-center">
                    <p className="text-blue-500 text-sm">rating will go here</p>
                </div>
                <div className="flex flex-col flex-wrap items-center mt-1">
                    <div className="flex items-center">
                        <MdOutlineCurrencyRupee className="text-xs"/>
                        <p className="text-xl">{newPrice}</p>
                    </div>
                    <div className="flex flex-wrap justify-between gap-1 mx-2">
                        <p className="text-xs text-gray-500">M.R.P</p>
                        <p className="line-through text-xs text-gray-500 flex items-center"><MdOutlineCurrencyRupee/>{item.price}</p>
                        <p className="text-xs">{`(${item.discount}%) off`}</p>
                    </div>
                    <div className="w-full h-20 flex justify-center items-end">
                        <div className=" bg-blue-500 flex justify-center mb-3 w-3/4 h-9 text-white rounded-md hover:bg-blue-700">
                            <button className="p-1">Add to cart</button>
                        </div>
                    </div>
                </div>
           </div>
        </Link>
    )
}

export default ProductCard;