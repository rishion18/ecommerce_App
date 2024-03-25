import { useEffect, useState } from "react";
import Carousal from "./carousal/Carousal.jsx";
import Categories from "./categories/categories.jsx";


const LandingPage = () => {

const[navBar , setNav] = useState(false)


    return(
        <div className="w-full h-full overflow-x-hidden">
            <Carousal navBar={navBar}/>
            <Categories navBar={navBar}/>
        </div>
    )
}

export default LandingPage;