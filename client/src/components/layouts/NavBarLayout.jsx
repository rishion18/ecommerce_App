import { useState } from "react";
import Header from "../Header/Header";
import FilterNavBar from "../filterNavBar/filterNavBar";

const NavBarLayout = ({children}) => {

const[navBar , setNav] = useState()

    return(
        <div className="w-full h-full overflow-x-hidden">
            <Header navBar={navBar} setNav={setNav}/>
            <FilterNavBar navBar={navBar} setNav={setNav}/>
            {children}
        </div>
    )
}

export default NavBarLayout;