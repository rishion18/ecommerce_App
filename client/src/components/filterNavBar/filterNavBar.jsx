import { IoMdClose } from "react-icons/io";
import DoubleRangeSlider from "./doubleRangeSlider";
import Accordion from "./accordian";


const FilterNavBar = ({setNav , navBar}) => {

    const closeNav = () => {
        setNav(false)
    }

    return(
        <div className={` w-3/4 md:w-96 h-screen absolute top-0 z-20 bg-slate-200 transform transition ease-in duration-200  ${!navBar?'-translate-x-full':'translate-x-0'}`}>
           <div className="relative w-full h-full">
              <div onClick={closeNav} className="absolute right-0 flex items-center justify-center w-8 h-8 border border-black border-solid cursor-pointer">
                 <IoMdClose className="w-6 h-6"/>
              </div>
              <div className="absolute flex flex-col w-full h-full top-20 ">
                    <div className="w-5/6 mx-4">
                        <p className="mb-4 text-xl">Adjust Price Range:</p>
                        <DoubleRangeSlider setNav={setNav}/>
                    </div>
                    <div className="w-full my-12">
                        <Accordion setNav={setNav}/>
                    </div>
               </div>
           </div>
        </div>
    )
}

export default FilterNavBar