import { useParams } from "react-router-dom";
import { setOperationList, setRenderList } from "../../store/productReducers";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Header from "../Header/Header";
import FilterNavBar from "../filterNavBar/filterNavBar";
import ProductCard from "./productCard";

const ProductsPage = () => {

const dispatch = useDispatch();

const[navBar , setNav] = useState(false);

const {category} = useParams();

const fetchProducts = () => {
    fetch(`http://localhost:3012/api/product/${category}`)
    .then(res => {
        if (!res.ok) {
            throw new Error('Failed to fetch data');
        }
        return res.json();
    })
    .then(data => {
        dispatch(setOperationList(data));
        dispatch(setRenderList(data));
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
};


useEffect(() => {
    fetchProducts();
} , [])

const{renderList} = useSelector(state => state.products);

    return (
        <div className="w-full h-auto flex justify-center overflow-x-hidden">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 overflow-x-hidden overflow-y-hidden">
                {
                    renderList?.map(item => <ProductCard item={item}/>)
                }
            </div>
        </div>
    )
}

export default ProductsPage;