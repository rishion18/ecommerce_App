import { useSelector } from "react-redux";
import ProductCard from "../productsPage/productCard";

const ProductsBySubCategory = () => {

const{renderList} = useSelector(state => state.products)
    
    return (
        <div className="flex justify-center w-full h-auto overflow-x-hidden">
            <div className="grid grid-cols-2 overflow-x-hidden overflow-y-hidden md:grid-cols-3 lg:grid-cols-5">
                {renderList?.map((item) => (
                    <ProductCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    )
}

export default ProductsBySubCategory;