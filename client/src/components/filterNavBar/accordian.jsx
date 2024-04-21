import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAllcategoriesQuery, useSortProductsBySubcategoryQuery } from '../../store/cartAsyncReducers';
import { setAllCategoriesAndSubcategories, setOperationList, setRenderList } from '../../store/productReducers';
import { MdOutlineArrowDropDown } from "react-icons/md";
import { useNavigate } from 'react-router-dom';


const Accordion = ({setNav}) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const dispatch = useDispatch();

    const BACKEND_URL_PRODUCTION = 'https://ecommerce-app-tysz.onrender.com'
    const BACKEND_URL_DEV = 'http://localhost:3012'

    const handleClick = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    const navigate = useNavigate()


    const {data:items , isError , isLoading , error} = useAllcategoriesQuery();

//    const [fetchProductBySubcategory] = useSortProductsBySubcategoryQuery();

   const handleSearch = async (subCategory) => {
    try {
      const products = await fetch(`${BACKEND_URL_PRODUCTION}/api/sortedBy/${subCategory}`)
      if (products.ok) {
        const res = await products.json();
        if(res){
            dispatch(setOperationList(res));
            dispatch(setRenderList(res));
        }
        setNav(false)
        navigate(`/filter/${subCategory}`)
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
    
    useEffect(() => {
        if (items) {
          dispatch(setAllCategoriesAndSubcategories(items));
        }
      }, [dispatch, items]);

    return (
        <div className="space-y-1">
           <p className='px-4 py-2 text-xl'>Categories :</p>
            {items?.map((cat, index) => (
                <div key={index} className="border border-gray-300 rounded">
                    <div
                        className="flex justify-between px-4 py-2 bg-gray-100 cursor-pointer hover:bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:text-white"
                    >
                        {cat.categoryName}
                        <MdOutlineArrowDropDown onClick={() => handleClick(index)} className='w-8 h-8'/>
                    </div>
                    {activeIndex === index && (
                        cat.subCategories?.map((subCat , index) => 
                        <div onClick={() => {handleSearch(subCat)}} key={index} className="px-4 py-2 bg-white hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:cursor-pointer hover:text-white">
                           {subCat}
                        </div>
                        )
                    )}
                </div>
            ))}
        </div>
    );
};

export default Accordion;
