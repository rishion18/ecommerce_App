import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAllcategoriesQuery } from '../../store/cartAsyncReducers';
import { setAllCategoriesAndSubcategories } from '../../store/productReducers';

const Accordion = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const dispatch = useDispatch();

    const handleClick = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };


    const {data:items , isError , isLoading , error} = useAllcategoriesQuery();
    
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
                        className="px-4 py-2 bg-gray-100 cursor-pointer flex justify-between"
                        onClick={() => handleClick(index)}
                    >
                        {cat.categoryName}
                    </div>
                    {activeIndex === index && (
                        cat.subCategories?.map((subCat , index) => 
                        <div key={index} className="px-4 py-2 bg-white">
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
