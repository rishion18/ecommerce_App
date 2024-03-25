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
        <Link className="w-full h-full flex justify-center" to={`/${item.category}/detail?p_id=${item._id}`} >
           <div className="flex flex-col w-52 h-auto m-3 border">
           <div className="w-52 h-52 border">
             <img src={item.images[0]} className="h-52 w-52 object-cover" alt="img"/>
            </div>
            <div className="flex justify-center mt-3">
                <p className="font-semibold">{item.title}</p>
            </div>
            <div className="flex justify-center">
                <p className="text-blue-500">rating will go here</p>
            </div>
            <div className="flex flex-col flex-wrap items-center mt-1">
                <div className="flex items-center">
                    <MdOutlineCurrencyRupee className="text-xs"/>
                    <p className="text-xl">{newPrice}</p>
                </div>
                <div className="flex justify-between gap-1">
                    <p className="text-xs text-gray-500">M.R.P</p>
                    <p className="line-through text-xs text-gray-500 flex items-center"><MdOutlineCurrencyRupee/>{item.price}</p>
                    <p className="text-xs">{`(${item.discount}%) off`}</p>
                </div>
                <div className=" bg-blue-500 text-white rounded-md m-4 hover:bg-blue-700">
                    <button className="p-1">Add to cart</button>
                </div>
            </div>
           </div>
        </Link>
    )
}

export default ProductCard;