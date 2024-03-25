import { useNavigate } from "react-router-dom"

const LandingPageCard = ({name , description}) => {

    const navigate = useNavigate()

   const handleSelection = (e) => {
      navigate(`/${name}`)    
   }

    return(
        <div className="w-full flex justify-center my-3 cursor-pointer" value={name} onClick={handleSelection}>
            <div className="bg-white w-44 h-48 rounded-xl shadow-xl relative">
               <p className="absolute top-5 left-2">{name}</p>
            </div>
        </div>
    )
}

export default LandingPageCard