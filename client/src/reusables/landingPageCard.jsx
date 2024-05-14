import { useNavigate } from "react-router-dom"

const LandingPageCard = ({name , description}) => {

    const navigate = useNavigate()

   const handleSelection = (e) => {
      navigate(`/${name}`)    
   }

    return(
        <div className="flex justify-center w-full cursor-pointer " value={name} onClick={handleSelection}>
            <div className="relative flex items-center justify-center w-20 h-24 shadow-xl bg-gradient-to-r from-cyan-500 to-blue-500 md:w-44 md:h-48 rounded-xl">
               <p className="text-white">{name}</p>
            </div>
        </div>
    )
}

export default LandingPageCard