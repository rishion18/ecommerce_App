import { useSelector } from "react-redux";
import LandingPageCard from "../../reusables/landingPageCard";
import { useEffect, useState } from "react";

const Categories = ({ navBar }) => {
    const [loading, setLoading] = useState(true);
    const { allCategoriesAndSubcategories } = useSelector((state) => state.products);

    useEffect(() => {
        if (allCategoriesAndSubcategories) {
            setLoading(false);
        }
    }, [allCategoriesAndSubcategories]);

    return (
        <div className={`flex flex-col justify-center bg-gradient-to-b from-slate-200 m-4 ${navBar ? 'opacity-25' : ''}`}>
            <p className="my-3 self-center text-lg">Categories</p>
            <div className={!loading?'h-auto lg:w-4/5 self-center grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center gap-3':'h-[400px] w-[400px] flex justify-center'}>
            {loading ? (
                <p className="text-black font-semibold text-xl m-3">It will take 50 secs<br/> to load categories here <br/> as i am using free <br/>hosting service...</p>
            ) : (
                allCategoriesAndSubcategories.map((item) => (
                    <LandingPageCard key={item.categoryName} name={item.categoryName} />
                ))
            )}

            </div>
        </div>
    );
};

export default Categories;
