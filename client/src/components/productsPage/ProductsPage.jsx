import { useParams } from "react-router-dom";
import { setOperationList, setRenderList } from "../../store/productReducers";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ProductCard from "./productCard";
import { useFetchAllProductsQuery } from "../../store/cartAsyncReducers";

const ProductsPage = () => {
    const dispatch = useDispatch();
    const { category } = useParams();

    const { data, isLoading, isError } = useFetchAllProductsQuery({ category });

    useEffect(() => {
        if (data) {
            dispatch(setOperationList(data));
            dispatch(setRenderList(data));
        }
    }, [data, dispatch]);

    const { renderList } = useSelector((state) => state.products);

    return (
        <div className="w-full h-auto flex justify-center overflow-x-hidden">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 overflow-x-hidden overflow-y-hidden">
                {renderList?.map((item) => (
                    <ProductCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;
