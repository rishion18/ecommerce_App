import { FaCheckCircle } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import check from '../../assets/check.svg'
import okay from '../../assets/okay.gif'

const Success = () => {

   const navigate = useNavigate()
    
    return (
    <div className="flex justify-center w-full">
        <div className="flex flex-col items-center justify-center w-4/5 gap-3 mt-10 text-green-500 shadow-xl items rounded-xl">
          <div className="flex flex-col items-center gap-3 m-2">
            {/* <FaCheckCircle className="w-20 h-20 mt-4"/> */}
            <img src={check} alt="check" className="w-20 h-20"/>
            <h1 className="text-2xl font-bold text-green-500">Order placed successfully!</h1>
          </div>
          <div>
            <p className="mb-4 text-center text-black">sit back !<br/> your order will be delivered on time</p>
          </div>
          <div onClick={() => {navigate('/')}} className="flex items-center gap-1 mb-4 text-white rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500">
            <MdHome className="w-6 h-6 ml-2"/>
            <button className="p-2 font-semibold">Home</button>
          </div>
        </div>
    </div>
)
}

export default Success