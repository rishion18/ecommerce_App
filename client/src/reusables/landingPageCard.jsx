import { useNavigate } from "react-router-dom"

const LandingPageCard = ({name , description}) => {

    const navigate = useNavigate()

   const handleSelection = (e) => {
      navigate(`/${name}`)    
   }

    return(
        <div className="w-full flex justify-center my-3 cursor-pointer" value={name} onClick={handleSelection}>
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 w-40 md:w-44 h-48 flex justify-center items-center rounded-xl shadow-xl relative">
               <p className="text-white">{name}</p>
            </div>
        </div>
    )
}

export default LandingPageCard