import { useEffect, useState } from "react";
import Carousal from "./carousal/Carousal.jsx";
import { useSelector } from "react-redux";
import CategoriesSwiper from "./MultiSlider/categoriesSwiper.jsx";
import TopDealsSlider from "./MultiSlider/topDeals.jsx";
import MainCarousal from "./MultiSlider/MainCarousal.jsx";


const LandingPage = () => {

const[navBar , setNav] = useState(false)

const { allCategoriesAndSubcategories } = useSelector((state) => state.products);


    return(
        <div className="w-full h-full overflow-x-hidden">
            <div className="flex w-full justify-center">
               <MainCarousal/>
            </div>
            <div className="w-full flex justify-center mt-2">
                <h1 className="text-2xl w-3/4">Categories:</h1>
            </div>
            <div className="w-full flex justify-center">
              <CategoriesSwiper/>
            </div>
            <div className="w-full flex justify-center mt-2">
                <h1 className="text-2xl w-3/4">Top Deals:</h1>
            </div>
            <div className="w-full flex justify-center">
              <TopDealsSlider/>
            </div>
        </div>
    )
}

export default LandingPage;