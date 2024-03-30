import { useSelector } from "react-redux";
import LandingPageCard from "../../reusables/landingPageCard";

const Categories = ({ navBar }) => {
    
    const { allCategoriesAndSubcategories } = useSelector((state) => state.products);

    return (
        <div className={`flex flex-col justify-center bg-gradient-to-b from-slate-200 m-4 ${navBar ? 'opacity-25' : ''}`}>
            <p className="my-3 self-center text-lg">Categories</p>
            <div className="h-auto lg:w-4/5 self-center grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center gap-3">
                {allCategoriesAndSubcategories?.map((item) => (
                    <LandingPageCard key={item.categoryName} name={item.categoryName} />
                ))}
            </div>
        </div>
    );
};

export default Categories;
